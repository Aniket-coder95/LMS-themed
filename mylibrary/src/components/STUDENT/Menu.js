import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
export default function Menu() {
  const data = useLocation();
  // console.log(data.pathname);
  const email =data.state;
    return (
      <div>
          <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="index3.html" className="brand-link">
        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">Student</span>
      </a>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
          </div>
          <div className="info">
            <a href="#" className="d-block">Do props</a>
          </div>
        </div>
        {/* <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div> */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item menu-open" >
                <Link to={`/studentdashboard`} 
                    state={email}>
                      <a 
                         className={`nav-link ${
                          data.pathname =='/studentdashboard' ? "active" : null
                        }`} >
                      <i className="nav-icon fas fa-tachometer-alt" />
                      Dashboard
                      </a>
                </Link>
            </li>


            <li className="nav-item menu-open">
            <Link to={`/studentbooks`} 
                    state={email}>
                      <a 
                         className={`nav-link ${
                          data.pathname =='/studentbooks' ? "active" : null
                        }`} >
                      <i className="nav-icon fas fa-thin fa-book" />
                      Books
                      </a>
                </Link>
            </li>

            <li className="nav-item menu-open">
            <Link to={``} 
                    state={email}>
                      <a className={`nav-link ${
                          data.pathname =='/' ? "active" : null
                        }`} >
                      <i className="nav-icon fas fa-thin fa-address-book" />
                      Contact
                      </a>
                </Link>
            </li>

            
           
           <li className="nav-header">LABELS</li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-circle text-danger" />
                <p className="text">Important</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-circle text-warning" />
                <p>Warning</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-circle text-info" />
                <p>Informational</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
      </div>
    )
}
