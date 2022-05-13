import React from 'react'
import { useLocation } from 'react-router-dom';
import AddNewBooks from './AddNewBooks'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Dashboard () {
  const [C_password , setC_password] = useState('')
  const [New_password , setNew_password] = useState('')
  const getdata = useLocation();
  const [email , setEmail] = useState(getdata.state[0])
  const [T_books, setT_books] = useState(Number)
  const [T_librarians , setT_librarians] = useState(Number)
  const role = getdata.state[1];
  const name = getdata.state[2];

  useEffect(()=>{
    axios.get('http://localhost:4000/getAllBooks')
    .then(Response=>{
      // alert(Response.data.users)
      setT_books(Response.data.books)
    })

    axios.get('http://localhost:4000/getAllLibrarian')
      .then(Response=>{
        // alert(Response.data.users)
        setT_librarians(Response.data.users)
      })

  })

  function changePassword(e){
    e.preventDefault();
    if(!C_password || !New_password){
      return alert("Enter password")
    }
    const obj ={email:email , C_password:C_password , New_password:New_password}
    console.log(obj)
    axios.post('http://localhost:4000/changePassword',obj)
    .then(Response=>{
      console.log(Response.data);
      alert(Response.data.msg)
    })
    window.location.href='/librariandashboard'
  }

  function hideme(){
    var x = document.getElementById('changepass');
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
  }
    return (
      <div>
        <div className="content-wrapper">
        <section className="content">
            <button onClick={hideme} className="btn btn-outline-success d-inline-block ml-auto" id="show-detail" type="button" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-align-justify"></i>
              <a  >Change Password</a>
            </button>
            <div className="col" id='changepass' style={{padding:"5px"}}>
              <div className="small-box bg-info">
                <div className="inner">
                  <form id="register-form" role="form" autoComplete="off" className="form">
                    <div>
                      <a><input type="text" value={C_password} onChange={(e)=>setC_password(e.target.value)} placeholder='Current password'/></a>
                      <a style={{margin:"0 0 0 5px"}}><input type="text" value={New_password} onChange={(e)=>setNew_password(e.target.value)} placeholder='New password'/></a>
                      <button style={{margin:"0 0 0 5px"}} onClick={changePassword}>Change</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <section className="content" style={{padding:"5px"}}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4 col-4">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{T_books}</h3>
                      <p style={{color:"black"}}>Total Books Available</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag" />
                    </div>
                    <a  className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                  </div>
                </div>

                <div className="col-lg-4 col-4">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>{T_librarians}</h3>
                      <p style={{color:"black"}}>Total Librarians</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <a className="small-box-footer">
                      
                    <Link to={`/librarianaddbooks`} 
                        state={[getdata.state[0],getdata.state[1],getdata.state[2]]}>
                          More info
                        <i className="fas fa-arrow-circle-right" />
                    </Link>
                     </a>
                  </div>
                </div>

                <div className="col-lg-4 col-4">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>T_students</h3>
                      <p style={{color:"black"}}>Students</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <a  className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="container-fluid">
              <section className="col-lg-5 connectedSortable">
                <div className="card bg-gradient-primary">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="fas fa-map-marker-alt mr-1" />
                      Add Books Here
                    </h3>
                    <div className="card-tools">
                      <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse" title="Collapse">
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <AddNewBooks />
                  <div id="world-map" />
                  </div>
                </div>
              </section>
            </div>
        </section>
      </div>
    </div>
    )
}























{/* <section className="col-lg-7 connectedSortable">
  <div className="card">
    <div className="card-header">
      <h3 className="card-title">
        <i className="fas fa-chart-pie mr-1" />
        Details
      </h3>
      <div className="card-tools">
        <ul className="nav nav-pills ml-auto">
          
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab">Admin</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="card-body">
      <div className="tab-content p-0">
        <GetuserDetails email={getdata.state}/>
      </div>
    </div>
  </div>
</section> */}