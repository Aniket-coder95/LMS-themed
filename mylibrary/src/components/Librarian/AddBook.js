import "../../Css/Dashboard.css"
import React,{useState , useEffect} from 'react'
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import {BsFillPenFill , BsFillArchiveFill,BsFillXCircleFill} from 'react-icons/bs'
// import { useEffect } from "react";

export default function LibrarianDashboard(){
    const [email , setEmail]=useState('');
    const [updatebook , setUpdatebook] = useState('');
    const [updateauthor ,setUpdateauthor] = useState('');
    const [isActive, setActive] = useState("false");
    const [msg, setmsg] = useState('');
    const location = useLocation();
    let [arr , setArr] = useState([]);
    const [bookid , setBookid] = useState();
    const [is_render,setIsRender]=useState(false)
    const [total_books , setTotal_books]=useState();
    // let bookid1='';
    
     
    useEffect(()=> {
        const token =window.localStorage.getItem('accessToken');
        if(!token){
            window.location.href='/';
        }else{
            setIsRender(true);
        }
        setEmail(location.state)
        axios.get("http://localhost:4000/booklist")
        .then((response) => {
            setArr(response.data.book);
            // console.log(response.data.book)
        })
    },[])


    function handleremovebook(bookid){
        // alert(bookid)
        axios.get(`http://localhost:4000/removebooks/${bookid}`)
        .then((response) => {
            
        })
        window.location.href='/librarianaddbooks';
    }
    function handleupdatebook(bookid){
        setBookid(bookid)
        let x1 = document.getElementById("updatebook-box")
        if(x1.style.display === 'none'){
            x1.style.display = "block"
        }

        // alert('im clicked'+bookid)
    }
    function hidden(){
        var x = document.getElementById("updatebook-box");
        x.style.display = "none";  
    }
    function updatebookFun(){
        // console.log(bookid)
        if(!updatebook || !updateauthor || !total_books){
           return alert('fill both entries')
        }
        const obj = {
            bookid:bookid,
            changebookname:updatebook,
            changeauthor:updateauthor,
            availableBooks:total_books
        }
        setmsg("Your Book is updated successfully")
        axios.post('http://localhost:4000/updatebooks',obj)
        .then((response) => {
            
        })
        document.getElementById("updatebook-box").style.display = "none"
        setTimeout(function(){
            window.location.href='/librarianaddbooks'
        },3000)
        
        // console.log(obj)
    }
    function hideme(){
        var x = document.getElementById("book-info");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    return(
        <>
        {is_render?(
        <div>
            <div className="wrapper">
                <div id="content">
                    {/* book details are here */}
                    <button onClick={hideme} className="btn btn-outline-success d-inline-block ml-auto" id="show-detail" type="button" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-align-justify"></i>
                        <a  >Show-Hide </a>
                    </button>
                    
                    <div className="tablediv table-responsive" id="book-info">
                        <h5 className="heading">Books Available</h5>
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="col-xs-1 text-center">Sr.no</th>
                                <th className="col-xs-1 text-center">BookName</th>
                                <th className="col-xs-1 text-center">Author</th>
                                <th className="col-xs-1 text-center">remove</th>
                                <th className="col-xs-1 text-center">update</th>
                            </tr>
                            </thead>
                            <tbody>
                            {arr.length !== 0 ? (
                                arr.map((val, index) => {
                                return (
                                    <tr  key={index+1}>
                                        <td className="col-xs-1 text-center">{index+1}</td>
                                        <td className="col-xs-1 text-center" > {val.bookname}</td>
                                        <td className="col-xs-1 text-center">{val.author}</td>
                                        <td className="col-xs-1 text-center" style={{color: "#8b1919"}} ><BsFillArchiveFill style={{cursor: "pointer"}} onClick={()=>{handleremovebook(val.bookid)}} /></td>
                                        <td className="col-xs-1 text-center" id="c" style={{color: "#445e11"}}><BsFillPenFill style={{cursor: "pointer"}} onClick={()=>{handleupdatebook(val.bookid)}} />
                                        
                                        </td>
                                    </tr>
                                );
                                })
                                ) : (
                                    <p style={{ textAlign: "center" }}> No Tasks</p>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    <div style={{color:'red'}}>
                        {msg}
                    </div>

                                    <br />
                    {/* update book is here */}
                    <div className="udate-book-box responsive" id="updatebook-box"  style={{display:'none'}}>
                        <div style={{position:"relative"}}>
                            <div id="icon">
                                <a><BsFillXCircleFill style={{margin:"20px"}} onClick={hidden}/></a>
                            </div>
                        </div>
                        <h5 className="heading">Update Here</h5>
                        <div className='d-flex justify-content-center'>
                            <div className="form-group w-50">
                                <label htmlFor="form3Example1ab">Book Name</label>
                                <input type="text" placeholder="Enter book name" className="form-control" value={updatebook} onChange={(e)=>setUpdatebook(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className="form-group w-50">
                                <label htmlFor="form3Example2ab">Author</label>
                                <input type="text" placeholder="Enter author" className="form-control" value={updateauthor} onChange={(e)=>setUpdateauthor(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                        <div className="form-group w-50">
                            <label htmlFor="form3Example4cg">Total_Books</label>
                            <input type="number" min="1" placeholder="Enter total books" className="form-control" value={total_books} onChange={(e)=>setTotal_books(e.target.value)} />
                        </div>
                        </div >
                        <div className="form-group d-flex justify-content-center" style={{margin:"10px 0 0 30px"}}>
                            <button className="btn btn-outline-success" onClick={updatebookFun}>Update</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        ):(<p></p>)}
        </>
    );
}