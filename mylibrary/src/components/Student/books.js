import "../../Css/Dashboard.css"
import { useLocation } from "react-router-dom";
import React,{useState , useEffect} from 'react'
import axios from "axios";
import {FaCartArrowDown} from 'react-icons/fa'
import Issuedbooks from "./isseudbooks";
import {BsFillXCircleFill} from 'react-icons/bs'




export default function Books(){
    // const [isActive, setActive] = useState("false");
    const location = useLocation();
    const [email , setEmail]=useState(location.state[0]);
    const [msg, setmsg] = useState('');
    let [arr , setArr] = useState([]);
    let [Totalissued , setTotalisseud] = useState(Number);
    const [is_render,setIsRender]=useState(false)
    
    
     
    useEffect(()=> {
        axios.get("http://localhost:4000/booklist")
        .then((response) => {
            setArr(response.data.book);
            setIsRender(true)
        })

        axios.get(`http://localhost:4000/getTotalIssued/${email}`)
        .then((response) => {
            setTotalisseud(response.data.total);
            // alert(Totalissued)
        })

    },[])

    

    function handleBorrowBook(bookid,bookname,author,available_books){
        if((Totalissued+1) <= 3){
            const obj ={
                email:email,
                bookid:bookid,
                bookname:bookname,
                author:author,
                available_books:available_books
            }
            axios.post("http://localhost:4000/borrowbooks",obj)
            .then(response=>{
                alert(response.data.borrowmsg)
            })
            window.location.href='/studentbooks'
        }else{
            alert("you can not issue books! please return first")
        }
        
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
        {is_render ? (
        <div>
            <div className="wrapper">
                <div id="content">
                    {/* book details are here */}
                    <button onClick={hideme} className="btn btn-outline-success d-inline-block ml-auto" id="show-detail" type="button" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-align-justify"></i>
                        <a></a>
                    </button>
                    
                    <div className="tablediv table-responsive" id="book-info">
                        <h5 className="heading text-primary">All Books Available</h5>
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="col-xs-1 text-center text-primary">Sr.no</th>
                                <th className="col-xs-1 text-center text-primary">BookName</th>
                                <th className="col-xs-1 text-center text-primary">Author</th>
                                <th className="col-xs-1 text-center text-primary">Available</th>
                                <th className="col-xs-1 text-center text-primary">Issue</th>
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
                                        <td className="col-xs-1 text-center">{val.available_books}</td>
                                        <td className="col-xs-1 text-center" style={{color: "#8b1919"}} ><FaCartArrowDown style={{cursor: "pointer"}} onClick={()=>{handleBorrowBook(val.bookid,val.bookname,val.author,val.available_books)}} /></td>
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

                    <div className="content">
                        <Issuedbooks email={email} />
                    </div>
                </div>
            </div>
        </div>
        ):(<p></p>)}
        </>
    );
}