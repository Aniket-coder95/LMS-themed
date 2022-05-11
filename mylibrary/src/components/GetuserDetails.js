// import "../../Css/Dashboard.css"
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import React,{useState} from 'react'
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function GetuserDetails(props){
    const [isActive, setActive] = useState("false");
    const location = useLocation();
    const [show, setShow] = React.useState(false);
    const [show1, setShow1] = React.useState(false);
    const [name , setName] = useState(''); 
    const [editname , setEditname] =useState('');
    const [email , setEmail] = useState(props.email);
    const [contact ,setContact] = useState('');
    const [editcontact, setEditcontact]=useState('');
    const [role , setRole] = useState('')
    const [is_render,setIsRender]=useState(false)
    // const [isRender , setIsrender] = useState(false)



    
    useEffect(()=>{
        const obj={
            email:email
        }

        axios.post('http://localhost:4000/getdata',obj)
        .then(response =>{
                setName(response.data.name)
                setEmail(response.data.email)
                setContact(response.data.contact)
                setRole(response.data.role)
        })
        .catch(e=>{
            if(e)throw e;
        })



    })
        

   function logout(){
    window. localStorage.clear('accessToken');
    window.location.href='/';
   }

    function hideme(){
        var x = document.getElementById("user-info");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }

    }
    
    function changeName(){
        setShow('true')   
    }
    function updateName(){
        const obj ={
            email : email
        }
        obj.name=editname
        console.log(editname)
        
        axios.post('http://localhost:4000/updatename',obj)
        .then(Response => {
            // alert(Response)
        })
        .catch(e => {
            if(e) throw e;
        })
        window.location.href='/admindashboard';
    }
    function changeContact(){
        setShow1('true')   
    }
    function updateContact(){
        const obj ={
            email : email
        }
        obj.contact=editcontact        
        axios.post('http://localhost:4000/updatecontact',obj)
        .then(Response => {
            alert(Response)
        })
        .catch(e => {
            if(e) throw e;
        })
        window.location.href='/admindashboard';
    }
    return(
        <div>
            {/* Showing details of user */}
            <div className="personal-detail">
                       <button onClick={hideme} className="btn btn-outline-success d-inline-block ml-auto" id="show-detail" type="button" aria-expanded="false" aria-label="Toggle navigation">
                           <i className="fas fa-align-justify"></i>
                           <a  ></a>
                       </button>
                       
                       <div className='user-info' id="user-info">
                           {/* <h3 className="heading">MyDetails</h3> */}
                           <div className='user-details'>
                               <div>
                                   <p className="text-dark">Name : {name} <FaEdit onClick={changeName} /></p>
                                   {show ? 
                                   <div>
                                       <input type="text" value={editname} onChange={e=> setEditname(e.target.value)}  />
                                       <button onClick={updateName}>Update</button>
                                   </div>
                                   : null}
                               </div>
                               <div>
                                   <p className="text-dark">Email : {email} </p>
                                   
                               </div>
                               <div>
                                   <p className="text-dark">Contact : {contact} <FaEdit onClick={changeContact} /> </p>
                                   {show1 ? 
                                   <div>
                                       <input type="text" value={editcontact} onChange={e=> setEditcontact(e.target.value)}  />
                                       <button onClick={updateContact}>Update</button>
                                   </div>
                                   : null}
                               </div>
                               <div>
                                   <p className="text-dark">Role : {role}  </p>
                               </div>
                               
                           </div>
                       </div>
                       {/* Showing details of user ends here*/}
                       <br /> <br />
                       {/* <div>{email}</div> */}
                    </div>
        </div>
    )
}