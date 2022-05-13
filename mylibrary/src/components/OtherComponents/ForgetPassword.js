import '../../Css/forgetPassword.css'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function ForegetPassword(){
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regContact = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    const [email , setEmail] = useState('')
    const [contact , setContact] = useState('')
    const [emailError, setEmailError] = useState('');
    const [contactError, setContactError] = useState('');
    const exist = ''

    const ResetPassword=(e)=>{
        e.preventDefault();
        setContactError("")
        setEmailError('');
        if (!regEmail.test(email)) {
            return setEmailError('Enter valid Email!');
        }
        if(!regContact.test(contact)){
            return setContactError("Add a valid contact")
        }
        const regdata = {
            email: email,
            contact: contact
        }
        axios.post("http://localhost:4000/forgetpassword",regdata)
        .then(Response =>{
            console.log(Response);
            exist = Response.data.msg
        })
        .catch(error => {
            console.log(error)
        })
        alert(exist)
        window.location.href = '/';
    }

    return (
        <>
        <div className=''>
            <div className="container ">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel-body ">
                            <div className="text-center" >
                                <h3><i className="fa fa-lock fa-4x" /></h3>
                                <h2 className="text-center">Forgot Password?</h2>
                                <p style={{color:"white"}}>You can reset your password here.</p>
                                <div className="panel-body">
                                    <form id="register-form" role="form" autoComplete="off" className="form" >
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                                                <input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email address" className="form-control" type="email" />
                                            </div>
                                            <span style={{ color: 'black',fontSize:15}}>{emailError}
                                            </span>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                                                <input id="contact" value={contact} onChange={(e)=>setContact(e.target.value)}  placeholder="contact no." className="form-control" type="contact" />
                                            </div>
                                            <span style={{color: 'black',fontSize:15}}>{contactError}
                                            </span>
                                        </div>
                                        <div className="form-group">
                                            <button  className="btn btn-lg btn-dark btn-block" onClick={ResetPassword} >Submit</button>
                                        </div> 
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}