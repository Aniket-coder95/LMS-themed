
import { Link} from "react-router-dom";
import React, { useState } from "react";
import validator from 'validator';
import axios from 'axios';
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'



 export default function SignIn(){
    function preback(){window.history.forward()}
    setTimeout(preback(),0)
    window.onload = function(){return null}

    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const navigate = useNavigate();
    let role  = '';
    let msg = '';
    let name = '';
    

    
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
        setEmailError('')
    } else {
      setEmailError('Enter valid Email!')
    }
  }
    
    function handleSubmit(e){
        
        e.preventDefault();
        console.log("submit button clicked");
        const formdata = {
            email:email,
            password:password,
        }
        //console.log(formdata);
        if(email !== '' && password !== '' )
        {
        axios.post('http://localhost:4000/signin',formdata)
            .then(Response =>{
                msg = Response.data.msg;
                role = Response.data.role;
                name = Response.data.name;
                if(msg){
                    console.log(msg)
                }

                window.localStorage.setItem('accessToken',Response.data.token);
                if(role === 'Librarian'){
                    navigate('/librariandashboard' ,{state:[email,role,name]});
                }else if(role === 'Student'){
                    navigate('/studentdashboard',{state:[email,role,name]});
                }else if(role === 'Admin'){
                    navigate('/admindashboard',{state:[email,role,name]});
                }else{
                    window.alert(msg)
                }
                
            })
            .catch(error => {
                console.log(error)
            })
           

        }else{
            window.alert("PLEASE FILL ALL THE ENTRIES !")
        }
       
    }
     
     return(
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-6 col-md-6 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong">
                    <div className="card-body p-5 text-center">

                        <h3 className="mb-1">Sign in</h3>

                        <div className="form-outline mb-0">
                        <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                        <input type="email" name="username" value={email} id="typeEmailX-2" className="form-control form-control-m"  onChange={(e)=> setEmail(e.target.value) } onKeyPress={validateEmail}/>
                            <span style={{
                            color: 'red',
                            fontSize:15
                            }}>{emailError}</span>
                        </div>

                        <div className="form-outline mb-0">
                        <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value) } name="password" id="typePasswordX-2" className="form-control form-control-m" />
                        </div>

                        <div style={{padding:"10px"}}>
                        <button id="12345678" className="btn btn-primary btn-lg btn-block" type="submit" onClick={handleSubmit}>Login</button>
                        </div>

                        <div>
                        <Link to ='/signup'>
                            <button id="12345678sr" className="btn btn-secondary btn-lg btn-block" >Register</button>
                        </Link>
                        </div>
                        <div className="containe">
                            {/* <h5 className="text-center text-muted mt-1 mb-0">New User? 
                            <a href='/signup' className="fw-bold text-body"><u>Register</u></a>
                            </h5> */}
                            <h5 className="text-center text-muted mt-1 mb-0">forget Password? 
                            <a href='/forgetpassword' className="fw-bold text-body"><u>Click</u></a>
                            </h5>
                        </div>
                        <hr className="my-4"/>

                    </div>
                    
                </div>
                
            </div>
            </div>
        </div>
     );
 }