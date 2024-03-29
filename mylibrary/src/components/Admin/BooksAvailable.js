import "../../Css/Dashboard.css"
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import React,{useState , useEffect} from 'react'
import axios from "axios";
// import { BsFillArchiveFill} from 'react-icons/bs'
// import {FaCartArrowDown} from 'react-icons/fa'
import Home from '../Home'





export default function BooksAvailable(){
    const [isActive, setActive] = useState("false");
    const location = useLocation();
    const [email , setEmail]=useState('');
    const [msg, setmsg] = useState('');
    let [arr , setArr] = useState([]);
    const [bookid , setBookid] = useState();
    const [is_render,setIsRender]=useState(false)
    
    
     
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
        })
    },[])

    function logout(){
        window. localStorage.clear('accessToken');
        window.location.href='/';
    }

    // function handleBorrowBook(bookid,bookname,author){
    //     const obj ={
    //         bookid:bookid,
    //         bookname:bookname,
    //         author:author
    //     }
    //     axios.post("http://localhost:4000/borrowbooks",obj)
    //     .then(response=>{
    //         alert(response.data.borrowmsg)
    //     })
        
    // }
    
    
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
                        {/* <h5 className="heading">Books Available</h5> */}
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="col-xs-1 text-center text-info">Sr.no</th>
                                <th className="col-xs-1 text-center text-info">Bookid</th>
                                <th className="col-xs-1 text-center text-info">BookName</th>
                                <th className="col-xs-1 text-center text-info">Author</th>
                                <th className="col-xs-1 text-center text-info">Total Books</th>
                                <th className="col-xs-1 text-center text-info">Available Books</th>
                                {/* <th className="col-xs-1 text-center">Borrow</th> */}
                            </tr>
                            </thead>
                            <tbody>
                            {arr.length !== 0 ? (
                                arr.map((val, index) => {
                                return (
                                    <tr  key={index+1}>
                                        <td className="col-xs-1 text-center text-dark">{index+1}</td>
                                        <td className="col-xs-1 text-center text-blue">{val.bookid}</td>
                                        <td className="col-xs-1 text-center text-dark" > {val.bookname}</td>
                                        <td className="col-xs-1 text-center text-green">{val.author}</td>
                                        <td className="col-xs-1 text-center text-blue">{val.total_books}</td>
                                        <td className="col-xs-1 text-center"><a className={val.available_books != 0? "text-success":"text-danger"}>{val.available_books}</a></td>
                                        {/* <td className="col-xs-1 text-center" style={{color: "#8b1919"}} ><FaCartArrowDown style={{cursor: "pointer"}} onClick={()=>{handleBorrowBook(val.bookid,val.bookname,val.author)}} /></td> */}
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























                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className="line"></div>
                    <h2>Lorem Ipsum Dolor</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className="line"></div>
                    <h2>Lorem Ipsum Dolor</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className="line"></div>
                    <h3>Lorem Ipsum Dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                </div>
            </div>
        </div>
        ):(<Home />)}
        </>
    );
}