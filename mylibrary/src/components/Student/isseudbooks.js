import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {BsFillXCircleFill} from 'react-icons/bs'



export default function Issuedbooks(props){
    const [issued , setIsseud] = useState([]);
    const [email , setEmail] = useState(props.email)

    useEffect(()=> {
        // const email=
        axios.get(`http://localhost:4000/getIssedBooks/${email}`)
        .then((response) => {
            
                setIsseud(response.data.details)
                console.log(issued)
            // setIsRender(true)
            // console
        })



    },[])

    function hidden(){
        var x = document.getElementById("book-issued-info");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }  
    }
    return(
        <div>
            <div className="tablediv table-responsive" >
                            <div style={{position:"relative",top:"-10px"}}>
                                <div id="icon">
                                    <BsFillXCircleFill style={{margin:"20px"}} onClick={hidden}/>
                                </div>
                            </div>
                            <h5 className="heading">Books Issued </h5>
                            <div id='book-issued-info'>
                                <table className="table table-bordered" >
                                <thead>
                                    <tr>
                                        <th className="col-xs-1 text-center">BookName</th>
                                        <th className="col-xs-1 text-center">Author</th>
                                        <th className="col-xs-1 text-center">issue Date</th>
                                        <th className="col-xs-1 text-center">return Date</th>
                                        <th className="col-xs-1 text-center">Fine</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {issued.length !== 0 ? (
                                        issued.map((val, index) => {
                                        return (
                                            <tr  key={index+1}>
                                                <td className="col-xs-1 text-center">{val.bookname}</td>
                                                <td className="col-xs-1 text-center">{val.author}</td>
                                                <td className="col-xs-1 text-center">{val.date}</td>
                                                <td className="col-xs-1 text-center">{val.returndate}</td>
                                                <td className="col-xs-1 text-center">0</td>
                                            </tr>
                                        );
                                        })
                                        ) : (
                                            <p style={{ textAlign: "center" }}> No books issued</p>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
        </div>
    )
}