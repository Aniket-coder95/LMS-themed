import React from 'react'
import GetuserDetails from '../GetuserDetails';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const getdata = useLocation();
  const [email , setEmail] = useState('')
  

  useEffect(()=>{
    setEmail(getdata.state)
    const obj={email:email}

    axios.post('http://localhost:4000/totalborrowed',obj)
    .then(response => {

    })
    .catch(e=>{

    })

  })

    return (
      <div>
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-thumbs-up" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text">Fines</span>
                      <span className="info-box-number">asdfgh</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-success elevation-1"><i className="fas fa-shopping-cart" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text">Books Borrowed</span>
                      <span className="info-box-number">asdfgh</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="info-box">
                    <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text"></span>
                      <span className="info-box-number">
                        10
                        <small>%</small>
                      </span>
                    </div>
                  </div>
                </div>
                  <div className='row'>
                  add here
                  </div>
              </div>
              
            </div>
          </section>
      </div>
      </div>
    )
}
