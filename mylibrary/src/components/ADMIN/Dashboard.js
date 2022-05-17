import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Line , Bar} from "react-chartjs-2";
import { useLocation } from 'react-router-dom';


export default function Dashboard () {
  const getdata = useLocation();
  const [T_users , setT_users] = useState(Number)
  const [T_librarians , setT_librarians] = useState(Number)
  const [T_students, setT_students] = useState(Number)
  const [T_books, setT_books] = useState(Number)
  // const [email , setEmail] = useState()

  useEffect(()=>{
    axios.get('http://localhost:4000/getAlluser')
    .then(Response=>{
      // alert(Response.data.users)
      setT_users(Response.data.users)
    })
    axios.get('http://localhost:4000/getAllLibrarian')
    .then(Response=>{
      // alert(Response.data.users)
      setT_librarians(Response.data.users)
    })
    axios.get('http://localhost:4000/getAllStudent')
    .then(Response=>{
      // alert(Response.data.users)
      setT_students(Response.data.users)
    })
    axios.get('http://localhost:4000/getAllBooks')
    .then(Response=>{
      // alert(Response.data.users)
      setT_books(Response.data.books)
    })
  })

  const data = {
    labels: ['1', '2', '3', '4', '5', '6','7','8','9','10'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor:'grey',
        borderColor: 'red',
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
  const data1 = {
    labels: ['1', '2', '3', '4', '5', '6','7','8','9','10'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor:'grey',
        borderColor: 'red',
      },
    ],
  }
  
  const options1 = {
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
  

    
  // render() {
    return (
      <div>
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="row">
              <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>{T_users-1}<sup style={{fontSize: 20}}></sup></h3>
                      <p style={{color:"black"}}>Total Users</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars" />
                    </div>
                    <a className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                  </div>
                </div>
                
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{T_books}</h3>
                      <p style={{color:"black"}}>Total Books Available</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag" />
                    </div>
                    <a className="small-box-footer">
                    <Link to={`/adminbooks`} 
                        state={[getdata.state[0],getdata.state[1],getdata.state[2]]}>
                          More info
                        <i className="fas fa-arrow-circle-right" />
                    </Link>
                    </a>
                  </div>
                </div>
                
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{T_students}</h3>
                      <p style={{color:"black"}}>Students</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <a className="small-box-footer">
                    <Link to={`/adminstudents`} 
                        state={[getdata.state[0],getdata.state[1],getdata.state[2]]}>
                          More info
                        <i className="fas fa-arrow-circle-right" />
                    </Link> 
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>{T_librarians}</h3>
                      <p style={{color:"black"}}>Librarians</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <a className="small-box-footer">
                    <Link to={`/adminlibrarians`} 
                        state={[getdata.state[0],getdata.state[1],getdata.state[2]]}>
                          More info
                        <i className="fas fa-arrow-circle-right" />
                    </Link>
                    </a>
                  </div>
                </div>
              </div>


              <div className='row'>
                <div className='col-lg-6 connectedSortable'>
                  <section className='card '>
                    <div className='header'>
                      <h1 className='title'>Chart-1</h1>
                    </div>
                    <Bar data={data} options={options} />
                  </section>
                </div>

                <div className='col-lg-6 connectedSortable'>
                  <section className='card '>
                    <div className='header'>
                      <h1 className='title'>Chart-2</h1>
                    </div>
                    <Line data={data1} options={options1} />
                  </section>
                </div>
              </div>
            </div>
            
          </section>
    </div>
      </div>
    )
  // }
}
