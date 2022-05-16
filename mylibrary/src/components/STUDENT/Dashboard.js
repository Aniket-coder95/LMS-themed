import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [C_password , setC_password] = useState('')
  const [New_password , setNew_password] = useState('')
  const getdata = useLocation();
  const [email , setEmail] = useState('')
  const [T_books, setT_books] = useState(Number)
  const [T_borrowed, setT_borrowed] = useState(Number)
  const [T_fine, setT_fine] = useState(Number)
  

  useEffect(()=>{
    setEmail(getdata.state[0])
    const obj={email:email}

    axios.post('http://localhost:4000/totalborrowed',obj)
    .then(response => {
      setT_borrowed(response.data.totalborrowed)
    })
    .catch(e=>{

    })
    axios.get('http://localhost:4000/getAllBooks')
    .then(Response=>{
      // alert(Response.data.users)
      setT_books(Response.data.books)
    })
    axios.get(`http://localhost:4000/totalFine/${email}`)
    .then(response => {
      setT_fine(response.data.totalfine)
    })
    .catch(e=>{

    })

  })

  function changePassword(e){
    e.preventDefault();
    if(!C_password || !New_password){
      return alert("Enter password")
    }
    const obj ={email:email , C_password:C_password , New_password:New_password}
    axios.post('http://localhost:4000/changePassword',obj)
    .catch(e=>{console.log("error in change password")})
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

          <section className="content" style={{padding:"5px"}} >
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4 col-4">
                  <div className="small-box bg-success">
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
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{T_borrowed}<sup style={{fontSize: 20}}></sup></h3>
                      <p style={{color:"black"}}>You borrowed</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars" />
                    </div>
                    <a className="small-box-footer" >More info <i className="fas fa-arrow-circle-right" /></a>
                  </div>
                </div>
                <div className="col-lg-4 col-4">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>Rs.{T_fine}</h3>
                      <p style={{color:"black"}}>Total fine</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <a className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                  </div>
                </div>
                
              </div>
              <div className="row">
                <section className="col-lg-7 connectedSortable">
                  {/* <div className="card">
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
                  </div> */}
                  
                  
                </section>
                {/* <section className="col-lg-5 connectedSortable">
                  <div className="card bg-gradient-primary">
                    <div className="card-header border-0">
                      <h3 className="card-title">
                        <i className="fas fa-map-marker-alt mr-1" />
                        Visitors
                      </h3>
                      <div className="card-tools">
                        <button type="button" className="btn btn-primary btn-sm daterange" title="Date range">
                          <i className="far fa-calendar-alt" />
                        </button>
                        <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse" title="Collapse">
                          <i className="fas fa-minus" />
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div id="world-map" style={{height: 250, width: '100%'}} />
                    </div>
                    <div className="card-footer bg-transparent">
                      <div className="row">
                        <div className="col-4 text-center">
                          <div id="sparkline-1" />
                          <div className="text-white">Visitors</div>
                        </div>
                        <div className="col-4 text-center">
                          <div id="sparkline-2" />
                          <div className="text-white">Online</div>
                        </div>
                        <div className="col-4 text-center">
                          <div id="sparkline-3" />
                          <div className="text-white">Sales</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section> */}
              </div>
            </div>
        </section>
      </div>
    </div>
    )
}
