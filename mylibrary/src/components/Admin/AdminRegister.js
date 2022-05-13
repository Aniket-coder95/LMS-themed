import '../../Css/adminregister.css'
import { useLocation } from "react-router-dom";
import React,{useState ,useEffect} from 'react'
import axios from "axios";


export default function AdminRegister(){
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regContact = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    const [isActive, setActive] = useState("false");
    const [email , setEmail] = useState('');
    const location = useLocation();
    const [is_render,setIsRender]=useState(false)
    const[addname , setAddname] = useState('');
    const[addemail , setAddemail] = useState('');
    const[addcontact , setAddcontact] = useState('');
    const[addrole , setAddrole] = useState('');
    const [emailError, setEmailError] = useState('');
    const [contactError, setContactError] = useState('');
    
    
   
    
    useEffect(()=> {
        const token =window.localStorage.getItem('accessToken');
        if(!token){
            window.location.href='/';
        }else{
            setIsRender(true);
        }
        setEmail(location.state)
    },[])

    const registeruser =(e)=>{
        e.preventDefault();
        if(!regContact.test(addcontact)){
            return setContactError("Add a valid contact no")
        }
        if (!regEmail.test(addemail)) {
           return setEmailError('Enter valid Email!');
        } 
        if(!addname || !addemail || !addcontact  || !addrole){
            window.alert("Fill every details!");
        }else{
            // send to backend here
            const regdata = {
                name: addname,
                email: addemail,
                contact: addcontact,
                role: addrole
            }
            axios.post("http://localhost:4000/signup",regdata)
            .then(Response =>{
                console.log("signed up");
                
            })
            .catch(error => {
                console.log(error)
            })
        }
        document.forms["myform"].reset();
        alert("user registered successfully");
    }

    return(
        <>
        {is_render?(
        <div>
            <div className="wrapper">
                <div id="content">
                    {/* <div>{location.state}</div> */}
                    <div className="registerdivadmin col-md col-md-offset-4 responsive" >
                        {/* <Signup /> */}
                        <form  id="myform" style={{margin: "20px 20px 0 20px"}} >
                            <div class="row" style={{margin: "20px 20px 0 20px"}}>
                                <div class="col">
                                <label className="label" >Full Name</label>
                                <input type="text" class="form-control" placeholder="Name" value={addname} onChange={(e)=> setAddname(e.target.value)} />
                                </div>
                                <div class="col">
                                <label className="label" >Email</label>
                                <input type="email" class="form-control" placeholder="Email" value={addemail} onChange={(e)=> setAddemail(e.target.value)}/>
                                <div >
                                    <span style={{
                                        // border:'outset',
                                        color: 'red',
                                        fontSize:15,
                                        }}>{emailError}
                                    </span>
                                </div>
                                </div>
                                
                            </div>
                            <div class="row" style={{margin: "20px 20px 0 20px"}}>
                                <div class="col">
                                <label className="label" >Contact</label>
                                <input  class="form-control" placeholder="Contact" value={addcontact} onChange={(e)=> setAddcontact(e.target.value)} />
                                <div >
                                    <span style={{
                                        // border:'outset',
                                        color: 'red',
                                        fontSize:15,
                                        }}>{contactError}
                                    </span>
                                </div>
                                </div>
                                <div class="col">
                                <label className="label" >Role</label>
                                    <select type="text" id="form3Example4cg" className="form-control" value={addrole} onChange={(e)=> setAddrole(e.target.value)}>
                                        <option>Select</option>
                                        <option >Admin</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div class="row" style={{padding: "20px 250px 0 250px"}}>
                                <button className="btn btn-secondary" onClick={registeruser}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ):(<p></p>)}
        </>
    );
}