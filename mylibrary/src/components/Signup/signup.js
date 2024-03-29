import axios from 'axios';
import React from 'react'
import { useState } from 'react'
// import '../../Css/test.css'

export default function Signup(){
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regContact = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    const [Name ,setName] = useState('')
    const [Email ,setEmail] = useState('')
    const [Role ,setRole] = useState('')
    const [Contact ,setContact] = useState('')
    const [emailError, setEmailError] = useState('');
    const [contactError, setContactError] = useState('');

    

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!regContact.test(Contact)){
            return setContactError("Add a valid contact no")
        }
        if (!regEmail.test(Email)) {
            return setEmailError('Enter valid Email!');
        }
        if(!Name || !Email || !Contact || !Role){
            return alert("Fill every details!");
        }else{
            // send to backend here
            const regdata = {
                name: Name,
                email: Email,
                contact: Contact,
                role: Role
            }
            axios.post("http://localhost:4000/signup",regdata)
            .then(Response =>{
                console.log(Response);
                alert("Loging credencials send to your mail")
            })
            .catch(error => {
                console.log(error)
            })
            window.location.href = '/';
        }
    }

    return(
       <div>
           <section className="vh-100 bg-image" style={{backgroundImage: `url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")`}}>
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                        <div className="card" >
                            <div className="card-body p-3">
                            <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                            <form>

                                <div className="form-outline mb">
                                <label className="form-label" htmlFor="form3Example1cg">Name*</label>
                                <input type="text" id="form3Example1cg" className="form-control form-control-lg" value={Name} onChange={(e)=> setName(e.target.value)}/>
                                </div>

                                <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3cg" >Email*</label>
                                <input type="email" id="form3Example2cg" className="form-control form-control-lg" value={Email} onChange={(e)=>setEmail(e.target.value)} />
                                <span style={{
                                    // border:'outset',
                                    color: 'red',
                                    fontSize:15,
                                    }}>{emailError}
                                </span>
                                </div>
                                
        

                                <div className="form-outline mb-4">
                                <label className="form-label" >Contact*</label>
                                <input type="text" id="form3Example3cg" className="form-control form-control-lg" value={Contact} onChange={(e)=> setContact(e.target.value)}/>
                                    <span style={{
                                        // border:'outset',
                                        color: 'red',
                                        fontSize:15,
                                        }}>{contactError}
                                    </span>
                                </div>

                                <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example4cg">Role*</label>
                                    <select type="text" id="form3Example4cg" className="form-control form-control-lg" value={Role} onChange={(e)=> setRole(e.target.value)}>
                                        <option>Select</option>
                                        {/* <option >Admin</option> */}
                                        <option>Student</option>
                                        <option >Librarian</option>
                                    </select>
                                </div>

                                <div className="ustify-content-center w-50" style={{marginLeft:"25%"}}>
                                    <button className="btn btn-dark btn-block btn-lg gradient-custom-4" type="button" onClick={handleSubmit}>Register</button>
                                </div>
                                <div style={{margin:"40px"}}>
                                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="/" className="fw-bold text-body"><u>Login here</u></a></p>
                                    <p className="text-center text-muted mt-1 mb-0">forget Password ? <a href='/forgetpassword' className="fw-bold text-body"><u>Click here</u></a></p>
                                </div>

                            </form>

                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>

       </div>
    )
}