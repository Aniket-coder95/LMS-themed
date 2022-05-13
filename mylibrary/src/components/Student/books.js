import "../../Css/Dashboard.css"
import { useLocation } from "react-router-dom";
import React,{useState , useEffect} from 'react'
import axios from "axios";
import { BsFillArchiveFill} from 'react-icons/bs'
import {FaCartArrowDown} from 'react-icons/fa'





export default function Books(){
    const [isActive, setActive] = useState("false");
    const location = useLocation();
    const [email , setEmail]=useState(location.state[0]);
    const [msg, setmsg] = useState('');
    let [arr , setArr] = useState([]);
    const [bookid , setBookid] = useState();
    const [is_render,setIsRender]=useState(false)
    
    
     
    useEffect(()=> {
        axios.get("http://localhost:4000/booklist")
        .then((response) => {
            setArr(response.data.book);
            setIsRender(true)
        })
    },[is_render])

    function handleBorrowBook(bookid,bookname,author,available_books){
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
                        {/* <h5 className="heading">Books Available</h5> */}
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="col-xs-1 text-center">Sr.no</th>
                                <th className="col-xs-1 text-center">BookName</th>
                                <th className="col-xs-1 text-center">Author</th>
                                <th className="col-xs-1 text-center">Available</th>
                                <th className="col-xs-1 text-center">Issue</th>
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
                </div>
            </div>
        </div>
        ):(<p></p>)}
        </>
    );
}