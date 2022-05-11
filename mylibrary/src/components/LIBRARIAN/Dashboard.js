import React, { Component } from 'react'
import GetuserDetails from '../GetuserDetails';
import { useLocation } from 'react-router-dom';

export default function Dashboard () {
  const getdata = useLocation();
    return (
      <div >
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Dashboard</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active"><a href="/">Logout</a></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <GetuserDetails email={getdata.state}/>
          </div>
        </div>
      </div>
    )
}
