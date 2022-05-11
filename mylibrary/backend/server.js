const express = require("express");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const app = express();
const port = 4000;
const secretKey = 'mynameiskumaraniketfromlucknow';

var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/testo7",{useNewUrlParser:true})
// .then(() => console.log("connection successfull ...."))
.catch((err) => console.log(err));

const Signup = require('../backend/schema/signup')
const registerbooks = require('../backend/schema/booksSchema')
const Borrowedbook = require('../backend/schema/borrowBook')





// //for production
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("../build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   });
// }




app.post('/signup', async(req,res)=>{
    // const name = req.body;
    function generateID() {
      const length = 8;
      const charset =
        "0123456789";
      let random_studentid = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        random_studentid += charset.charAt(Math.floor(Math.random() * n));
      }
      return random_studentid;
    }
    var obj =[
        {
          "studentid":generateID(),
          "name": req.body.name,
          "email": req.body.email,
          "contact": req.body.contact,
          "password": req.body.password,
          "role": req.body.role
          
        }];
    await Signup.insertMany(obj,function(err,res){
    if(err)throw err;
    console.log("signed-up");
    })
  
})


app.post("/signin",async(req,res)=> {
      const email = req.body.email;
      const pass = req.body.password;
      const user = await Signup.findOne({email , pass,isblocked:false})

      if(!user || user === ''){
        console.log("Email or Password not found in database")
        res.json({ msg : "Email or Password not found in database"})
      }else{
        const name = user.name;
        const role = user.role;
        const contact = user.contact;
        const password = user.password;
        console.log("user "+email+" successfully logged-in as "+role);
        
        jwt.sign({ user }, secretKey, (err, token) => {
          if (err) {
            return res.json({
              msg: "Something went Wrong,Please Try Again",
            });
          }
          else
          {
            res.json({name:name , role : role, contact:contact , password:password, token:token})

          }
        });
        
      }      
    
});


app.post("/Admin",async(req,res)=>{
  const user = req.body.email;
  await registerschema.findOneAndDelete({email:user})
  .then(response =>{
    if(response == null){
      res.json({msg:"user not found in database"})
    }else{
      res.json({msg:"user found and removed from database successfully"})
    }
  })
  .catch(e => {
    if(e) throw e;
  })

})

app.post('/getdata',async(req,res)=>{
  var email = req.body.email
  let user =await Signup.findOne({email})
  .catch(e=>({
    if (e) {
     throw e; 
    }
  }))
  res.json({name:user.name,email:user.email,contact:user.contact, role : user.role  })
  // console.log(user.name)
})

app.post('/updatename',async(req,res)=>{
  var email = req.body.email
  await Signup.findOneAndUpdate({email:email},{name:req.body.name})
  console.log(email)
})
app.post('/updatecontact',async(req,res)=>{
  var email = req.body.email
  if(req.body.contact !==''){
    await Signup.findOneAndUpdate({email:email},{contact:req.body.contact})
  }
  // console.log(email)
})


app.post('/registerbooks', async(req,res)=>{
  function generateID() {
    const length = 8;
    const charset =
      "0123456789";
    let random_bookId = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      random_bookId += charset.charAt(Math.floor(Math.random() * n));
    }
    return random_bookId;
  }

  var obj = {
    bookid:generateID(),
    bookname:req.body.bookname,
    author:req.body.author
  }
  // console.log(obj)
  await registerbooks.insertMany(obj)
  .catch(e=>{
    // res.json({msg:"something went wrong"})
    if(e)throw e;
  })
  .then(response => {
    console.log("inserted")
  })
  res.json({msg:"Book added successfully"})
})

app.get("/booklist", async(req,res )=>{
  var blist =await registerbooks.find({isblocked:false},{__v:0})
  res.json({book:blist})
  
})
app.get('/removebooks/:bookid',async(req,res)=>{
  const {bookid} = req.params
  await registerbooks.updateOne({bookid},{$set:{isblocked:true}})
  console.log('book removed')
})

app.post('/updatebooks', async(req,res)=>{
  const bookid = req.body.bookid
  const changebookname = req.body.changebookname
  const changeauthor =req.body.changeauthor
  await registerbooks.updateOne({bookid},{$set:{bookname:changebookname,author:changeauthor}})
  
  console.log("updated")
})


app.get("/studentlist", async(req,res )=>{
  var studentlist =await Signup.find({role:'Student',isblocked:false},{role:0,password:0,_id:0,__v:0})
  // console.log(studentlist)
  res.json({students:studentlist})
})

app.get("/librarianlist", async(req,res )=>{
  // console.log("this is book list api");
  var librarianlist =await Signup.find({role:'Librarian',isblocked:false},{role:0,password:0,_id:0,__v:0})
  // console.log(librarianlist)
  res.json({librarians:librarianlist})
})

app.post("/removeusers",async(req,res)=>{
  const studentid = req.body.studentid
  console.log(studentid)
  await Signup.updateOne({studentid:studentid,isblocked:false},{$set:{isblocked:true}})
  console.log('user removed')
})

app.post('/update-users-data',async(req,res)=>{
  const studentid = req.body.studentid
  const name = req.body.name
  const email = req.body.email
  const contact = req.body.contact
  await Signup.updateOne({studentid:studentid,isblocked:false},{$set:{name:name , email:email,contact:contact}})
  console.log("user updated")
})

app.post("/borrowbooks" , async(req,res)=>{
  const obj = {
    bookid:req.body.bookid,
    bookname:req.body.bookname,
    author:req.body.author
  }
  await Borrowedbook.insertMany(obj)
  .then(resp=>{
    res.json({borrowmsg:"successfully borrowed"})
  })
})

app.get('/getAlluser', async(req,res)=>{
  const arr =await Signup.find({isblocked:false},{name:0,email:0,contact:0,password:0,role:0,_id:0,__v:0,isblocked:0})
  // console.log(arr.length);
  res.json({users:arr.length})
})

app.get('/getAllLibrarian', async(req,res)=>{
  const role = "Librarian"
  const arr =await Signup.find({role:role,isblocked:false},{name:0,email:0,contact:0,password:0,role:0,_id:0,__v:0,isblocked:0})
  res.json({users:arr.length})
})

app.get('/getAllStudent', async(req,res)=>{
  const role = "Student"
  const arr =await Signup.find({role:role,isblocked:false},{name:0,email:0,contact:0,password:0,role:0,_id:0,__v:0,isblocked:0})
  res.json({users:arr.length})
})
app.get('/getAllBooks', async(req,res)=>{
  const arr =await registerbooks.find({isblocked:false},{bookname:0,author:0,_id:0,__v:0,isblocked:0})
  res.json({books:arr.length})
})

app.listen(port, ()=>{
  
    console.log(`listening to port no ${port}`);
});