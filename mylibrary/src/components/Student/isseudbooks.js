import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {BsFillXCircleFill , BsBank2} from 'react-icons/bs'



export default function Issuedbooks(props){
    const [issued , setIsseud] = useState([]);
    const [email , setEmail] = useState(props.email)
    // const [fine , setFine] = useState(Number)
    

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

    const payandreturn =(bookid,issueDate , fine)=>{
    //    return alert("returned")
        const obj ={
            issueDate:issueDate,
            fine:fine,
            email:email,
            bookid:bookid
        }
        axios.post('http://localhost:4000/returnbook',obj)
        .catch(e => {console.log('error in /returnbook')})
        window.location.href='/studentbooks';
    }

    function hidden(){
        var x = document.getElementById("book-issued-info");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }  
    }
    const getFine = (return_date , bookid) =>{
        const current_date = new Date().toLocaleDateString();
        console.log(current_date);
      
        const date_array = return_date.split("/");
        const date_array2 = current_date.split("/");
      
        const current_date_day =
          new Date(date_array2[2], date_array2[1], date_array2[0]).getTime() /
          (1000 *60 * 60 * 24);
      
        //new Date(yyyy,mm,dd)
        const return_date_day =
          new Date(date_array[2], date_array[1], date_array[0]).getTime() /
          (1000 * 60 * 60 * 24);
      
        const late = current_date_day - return_date_day;
        const fine = late<0 ? 0 : (late * 5)
        
        const obj = {fine:fine , bookid:bookid}
        // console.log(obj.fine,obj.bookid)
        axios.post("http://localhost:4000/updatefine",obj)
        .catch(e=>{console.log("error in updatefine")})

        return late < 0 ? 0 : (late * 5)  // * rupees per day
    }
    return(
        <div>
            <div className="tablediv table-responsive" >
                            <div style={{position:"relative",top:"-10px"}}>
                                <div id="icon">
                                    <a><BsFillXCircleFill style={{margin:"20px"}} onClick={hidden}/></a>
                                </div>
                            </div>
                            <h5 className="heading text-primary">Books Issued </h5>
                            <div id='book-issued-info'>
                                <table className="table table-bordered" >
                                <thead>
                                    <tr>
                                        <th className="col-xs-1 text-center text-primary">BookName</th>
                                        <th className="col-xs-1 text-center text-primary">Author</th>
                                        <th className="col-xs-1 text-center text-primary">Issue Date</th>
                                        <th className="col-xs-1 text-center text-primary">Return Date</th>
                                        <th className="col-xs-1 text-center text-primary">Fine (Rs.)</th>
                                        <th className="col-xs-1 text-center text-primary">Pay & return</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {issued.length !== 0 ? (
                                        issued.map((val, index) => {
                                        return (
                                            <tr  key={index+1}>
                                                <td className="col-xs-1 text-center">{val.bookname}</td>
                                                <td className="col-xs-1 text-center">{val.author}</td>
                                                <td className="col-xs-1 text-center text-success">{val.date}</td>
                                                <td className="col-xs-1 text-center text-info">{val.returndate}</td>
                                                <td className="col-xs-1 text-center text-danger">Rs. {getFine(val.returndate , val.bookid)}</td>
                                                <td className="col-xs-1 text-center"><a><BsBank2 onClick={()=>{payandreturn(val.bookid,val.date,val.fine)}}/></a></td>
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