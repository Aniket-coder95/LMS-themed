const express = require("express");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const app = express();
const port = 4000;
const secretKey = 'mynameiskumaraniketfromlucknow';
const { response } = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./credential.env" });
 
const sendmail = require('./HandleMail')
const randPass = require('./Generatepassword')
const ResetPassword = require('./Resetpasswordmail')
const uniqueId = require('./uniqueId') 
const encPassword = require('./password/encrypt')
const checkPass = require('./password/checkpassword')

  
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// const asdf = Encpassword("kumar")
// console.log(asdf) 
// console.log(checkPass("kumar",asdf))
// console.log(uniqueId())
// console.log(randPass())
// sendmail("kum.testo7@gmail.com", "Student", "kumar aniket", "random_password")
// ResetPassword("kum.testo7@gmail.com","asdfgd")

const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/testo7",{useNewUrlParser:true})  //mongodb compass
mongoose.connect("mongodb+srv://SPAN-BLR-1472:myFfgy640W9qni6i@cluster0.7qi8y.mongodb.net/testo7?retryWrites=true&w=majority") //mongodbAtlas
.then(() => console.log("connection successfull ...."))
.catch((err) => console.log(err));

const Signup = require('../backend/schema/signup')
const registerbooks = require('../backend/schema/booksSchema')
const Borrowedbook = require('../backend/schema/borrowBook');
const ReturnBook = require('../backend/schema/returnedbook')
const e = require("express");
// const { getMaxListeners } = require("../backend/schema/signup");


app.post('/signup', async(req,res)=>{
    // const name = req.body;
    function generateID() {
      const length = 4;
      const charset =
        "0123456789";
      let random_studentid = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        random_studentid += charset.charAt(Math.floor(Math.random() * n));
      }
      return random_studentid;
    } 
    const pass = randPass()
    const password = encPassword(pass)
    var obj =[
        {
          studentid:generateID(),
          name: req.body.name,
          email: req.body.email,
          contact: req.body.contact,
          password: password, 
          role: req.body.role
          
        }];
        console.log(req.body.email,req.body.role,req.body.name,password)
      await Signup.insertMany(obj,function(err,res){
      if(err)throw err;
          console.log("signed-up"); 
          sendmail(req.body.email,req.body.role,req.body.name,pass)

      })
  
})


app.post("/signin",async(req,res)=> {
      const email = req.body.email;
      const password = req.body.password;
      const user = await Signup.findOne({email,isblocked:false})

      if(!checkPass(password,user.password)){
        // console.log("Email or Password not found in database")
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

app.post('/changePassword',async(req,res)=>{
  const email = req.body.email
  const getpass = await Signup.findOne({email:email,isblocked:false})
  const password = checkPass(req.body.C_password, getpass.password)
  const New_password = encPassword(req.body.New_password)
  // console.log(New_password)
  if(password){
    const is_updated = await Signup.updateOne({email:email,isblocked:false},{$set:{password:New_password}})
    if(!is_updated.modifiedCount){
      res.json({msg:"enter correct password"})
    }else{
      res.json({msg:"password changed"})
    }
  }else{
    res.json({msg:"enter correct password"})
  }
})


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
    "bookid":generateID(),
    "bookname":req.body.bookname,
    "author":req.body.author,
    "total_books":+(req.body.total_books),
    "available_books":+(req.body.total_books)
  }
  console.log(obj)
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
  const blist = await registerbooks.find({isblocked:false},{__v:0})
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
  const total_books = req.body.availableBooks
  await registerbooks.updateOne({bookid,isblocked:false},{$set:{bookname:changebookname,author:changeauthor,total_books:total_books}})
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
  var email = req.body.email
  var available_books = (+(req.body.available_books) - 1)
  const obj = {
    email:email,
    bookid:req.body.bookid,
    bookname:req.body.bookname,
    author:req.body.author
  }
  var exist = await Borrowedbook.findOne({bookid:obj.bookid,email:email},{ _id:0 , bookname:0,author:0,date:0,isblocked:0,__v:0})
  if( !exist ){
      await Borrowedbook.insertMany(obj)  
      .then(resp=>{
        res.json({borrowmsg:"successfully borrowed"})
      })
      await registerbooks.updateOne({bookid:obj.bookid,isblocked:false},{$set:{available_books:available_books}})
      .then(response=>{console.log("list updated")})
  }else {
    res.json({borrowmsg:"you have already borrowed"})
  } 

  
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
  const arr = await registerbooks.find({isblocked:false},{bookname:0,author:0,_id:0,__v:0,isblocked:0})
  res.json({books:arr.length})
})
 
app.post('/totalborrowed',async(req,res)=>{
  //console.log(req.body.email)
  const email = req.body.email
  const totalborrowed = await Borrowedbook.find({email,isblocked:false})
  if(!totalborrowed){
    res.json({totalborrowed: 0})
  }else{
    res.json({totalborrowed:totalborrowed.length})
  }
})


app.post('/forgetpassword',async(req,res)=>{
  const email = req.body.email 
  const contact = req.body.contact
  const userexist = await Signup.findOne({email:email,isblocked:false,contact:contact})
  if(!userexist){
    res.json({msg:"Not find any user"})
  }else{
    // console.log()
    const password = randPass();
    await Signup.updateOne({email:email,contact:contact,isblocked:false},{$set:{password:encPassword(password)}})
    ResetPassword(userexist.email,password)
    res.json({msg:"Credencials sent to your mail"})
  }
})

 



app.get('/getTotalIssued/:user',async(req,res)=>{
  const {user} = req.params
    // console.log(user)
    const count = await Borrowedbook.find({email:user})
    if(!count){
      res.json({total:count.length})
      // console.log(0)
    }else{
      res.json({total:count.length})
      // console.log(count.length)
    }
})

app.get('/getIssedBooks/:user',async(req,res)=>{
  const {user} = req.params
    console.log(user)
    const count = await Borrowedbook.find({email:user,isblocked:false})
    if(!count){
      // res.json({notify:"No book isseued to you"})
      console.log("No book isseued to you")
    }else{
      res.json({details:count})
      // console.log(count)
    }
})

app.get('/totalFine/:email',async(req,res)=>{
  const {email} = req.params
    // console.log(email)
    const x =await Borrowedbook.find({email:email})
    var totalfine =''
    if(!x){
      res.json({totalfine:totalfine})
      // console.log("zero")
    }else{
      x.map((val,index)=>{
        totalfine = eval(totalfine + val.fine)
      })
      res.json({totalfine:totalfine})
      // console.log(totalfine)
    }
})
app.post('/updatefine',async(req,res)=>{
  let bookid = req.body.bookid
  let fine = req.body.fine
  // console.log( bookid ,fine)
  await Borrowedbook.updateOne({bookid:bookid,isblocked:false},{$set:{fine:fine}})
})


app.post('/returnbook',async(req,res)=>{
    const email = req.body.email
    const bookid = req.body.bookid
    const issueDate = req.body.issueDate
    const fine = req.body.fine
    const returndate = new Date().toLocaleDateString()
    const obj ={
      email:email,
      bookid:bookid,
      issueDate:issueDate,
      returndate:returndate,
      fine:fine
    }
    ReturnBook.insertMany(obj)
    .catch(e=>{if(e)throw e})
    const x = await registerbooks.findOne({bookid:bookid},{_id:0,bookid:0,bookname:0,author:0,total_books:0,isblocked:0,__v:0})
    const x1 = eval(x.available_books)+1
    // console.log(x1)
    await registerbooks.updateOne({bookid:bookid,isblocked:false},{$set:{available_books:x1}})

    await Borrowedbook.deleteOne({bookid:bookid})
 

    console.log( email,bookid,issueDate,fine , returndate)
},[])


app.get('/getFinedetails/:email',async(req,res)=>{
  const {email} = req.params
    // console.log(email)
    const x = await Borrowedbook.find({email:email,isblocked:false})
    // var totalfine =''
    if(!x){
      // res.json({details:x})
      console.log("zero")
    }else{
      res.json({details:x})
      console.log("totalfine")
    }
})



 


app.listen(port, ()=>{
  
    console.log(`listening to port no ${port}`);
}); 
 













// //for production
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("../build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   });
// }