import React from 'react'
import BookChart from '../OtherComponents/BookChart'
import { Line , Bar ,Pie ,Doughnut} from "react-chartjs-2";
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
  const [borrowArr , setBorrowArr] = useState([])
  const [T_fine_details , setT_fine_details] = useState([])
  

  useEffect(()=>{
    setEmail(getdata.state[0])
    const obj={email:email}

    axios.post('http://localhost:4000/totalborrowed',obj)
    .then(response => {
      setT_borrowed(response.data.totalborrowed)
    })
    .catch(e=>{})
    axios.get('http://localhost:4000/getAllBooks')
    .then(Response=>{
      setT_books(Response.data.books)
    })
    axios.get(`http://localhost:4000/totalFine/${email}`)
    .then(response => {
      setT_fine(response.data.totalfine)
    })
    .catch(e=>{})

    axios.get(`http://localhost:4000/getFinedetails/${email}`)
    .then(response => {
      if(!response.data.details){
        return;
      }
      setT_fine_details(response.data.details)
    })
    .catch(e=>{})
    
  },[T_books])

  function borrowLabel(){ 
    let x = [];
    T_fine_details.map((val, index) => {
      x[index] = val.bookname
    })
    return x
  }
  function borrowdata(){ 
    let x = [];
    T_fine_details.map((val, index) => {
      x[index] = val.fine
    })
    return x
  }
  
  
  const data = {
    labels: borrowLabel(),
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: ['#C9DE00','#2FDE00','#00A6B4','#00A6B4','#6800B4','#B21F00','#C9DE00',],
        // hoverBackgroundColor: [
        // '#501800',
        // ],
        data:borrowdata(),
      },
    ],  
  }
  const data1 = {
    labels: [1,2,3,4,5,6,7],
    datasets: [
      {
        label: '# of Votes',
        data: [1,2,3,4,5,6,7],
        fill: false,
        backgroundColor: ['#C9DE00','#2FDE00','#00A6B4','#6800B4','#B21F00','#C9DE00','#2FDE00','#00A6B4','#6800B4','#B21F00','#C9DE00',],
        borderColor: 'red',
      },
    ],
  }
  const data2 = {
    labels: [1,2,3,4,5,6,7],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#00A6B4', '#6800B4','#B21F00','#C9DE00',
        ],
        data:[1,2,3,4,5,6,7],
      },
    ],
  }
  
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  

  function changePassword(e){
    e.preventDefault();
    if(!C_password || !New_password){
      return alert("Enter password")
    }
    const obj ={email:email , C_password:C_password , New_password:New_password}
    axios.post('http://localhost:4000/changePassword',obj)
    .then(response=>{alert(response.data.msg)})
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
                      <p style={{color:"black"}}>You have borrowed</p>
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
              <div className='col-lg-4 connectedSortable'>
                <section className='card '>
                  <BookChart />
                </section>
              </div>
              <div className='col-lg-4 connectedSortable'>
                <section className='card '>
                  <Pie data={data}
                      options={{
                        title:{
                          display:true,
                          text:'Fines you have to pay',
                          fontSize:20
                        },
                        legend:{
                          display:true,
                          position:'left',
                        }
                      }} />
                </section>
              </div>
              
              <div className='col-lg-4 connectedSortable'>
                <section className='card '>
                  <Bar data={data1} options={options} />
                </section>
              </div>
              
                
              </div>
            </div>
          </section>

          <section>
            <div className='row'>
              
            </div>
          </section>
      </div>
    </div>
    )
}
