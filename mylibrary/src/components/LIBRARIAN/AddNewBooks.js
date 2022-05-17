import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function AddNewBooks(){
    const [bookname , setBookname] = useState('');
    const [authorname , setAuthorname] = useState('');
    const [bookerrmsg , setBookerrmsg]=useState('');
    const [total_books , setTotal_books]=useState();

    function addbookFun(){
                    <input type="text" placeholder="Enter " className="form-control" value={total_books} onChange={(e)=>setTotal_books(e.target.value)} />
        if(!bookname || !authorname || !total_books){
            alert("Enter both  value bookname and author name then add!")
        }else{
            const obj ={
                bookname:bookname,
                author:authorname,
                total_books:total_books
            }
            console.log(obj);
            axios.post('http://localhost:4000/registerbooks',obj)
            .catch(e=> {
                if(e)throw e;
            })
            .then(resp =>{
                setBookerrmsg(resp.data.msg)
            })

            setBookname('');
            setAuthorname('')
            // alert(bookerrmsg)
        }
    }
    return(
        <>
        <div className='wrapper'>
            <div className="addNewBooks" id="addNewBooks">
                {/* <h3 className="heading">Add Book Here</h3>  */}
                <div className="addBooks">

                    <div className='d-flex justify-content-center'>
                        <div className="form-group w-50">
                            <label htmlFor="form3Example4cg">Book Name</label>
                            <input type="text" placeholder="Enter book name" className="form-control" value={bookname} onChange={(e)=>setBookname(e.target.value)} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className="form-group w-50">
                            <label htmlFor="form3Example4cg">Author</label>
                            <input type="text" placeholder="Enter author name" className="form-control" value={authorname} onChange={(e)=>setAuthorname(e.target.value)} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className="form-group w-50">
                            <label htmlFor="form3Example4cg">Total_Books</label>
                            <input type="number" min="1" placeholder="Enter total books" className="form-control" value={total_books} onChange={(e)=>setTotal_books(e.target.value)} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className="form-group w-50">
                            <button className="btn btn-outline-success" onClick={addbookFun}>Add</button>
                        </div>
                        <br />
                    </div>
                    <div className=''>
                        {bookerrmsg}
                    </div>
                </div>
                            
            </div>
        </div>
        </>
    )
}