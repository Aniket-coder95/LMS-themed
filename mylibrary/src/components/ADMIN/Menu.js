
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'


export default function Menu () {
  const data = useLocation();
  const name = data.state[2];
  const role = data.state[1];
  const email =data.state[0];
  // alert(data.state[2])
    return (
      <div>
          <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* <a  className="brand-link">
          <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
          <span className="brand-text font-weight-light">Admin</span>
          <a className="brand-text font-weight-light">Admin</a>
        </a> */}
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="dist/img/AdminLTELogo.png" className="img-circle elevation-2" alt="User Image" />
          </div>
          <div className="info">
            <a className="d-block">{email}</a>
            <div className="display-7">
              <a >{role}</a>
            </div>
          </div>
         
        </div>
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
          </div>
          <div className="info">
            <a className="d-block">{name}</a>
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
                <Link to={`/admindashboard`} 
                    state={[email,role,name]}>
                      <a 
                         className={`nav-link ${
                          data.pathname =='/admindashboard' ? "active" : null
                        }`} >
                      <i className="nav-icon fas fa-tachometer-alt" />
                      Dashboard
                      </a>
                </Link>
            </li>


            <li className="nav-item menu-open">
              <Link to={`/adminstudents`} 
                  state={[email,role,name]}>
                    <a 
                        className={`nav-link ${
                        data.pathname =='/adminstudents' ? "active" : null
                      }`} >
                    <i className="nav-icon fas fa-thin fa-user-tie" />
                    Students
                    </a>
              </Link>
            </li>
            <li className="nav-item menu-open">
            <Link to={`/adminlibrarians`} 
                    state={[email,role,name]}>
                      <a className={`nav-link ${
                          data.pathname =='/adminlibrarians' ? "active" : null
                        }`} >
                      <i className="nav-icon fas fa-thin fa-user-tie" />
                      Librarians
                      </a>
                </Link>
            </li>
            
            <li className="nav-item menu-open">
            <Link to={`/adminbooks`} 
                    state={[email,role,name]}>
                      <a className={`nav-link ${
                          data.pathname =='/adminbooks' ? "active" : null
                        }`} >
                      <i className="nav-icon fas fa-thin fa-user-tie" />
                      Books
                      </a>
                </Link>
            </li>

            <li className="nav-item menu-open">
            <Link to={`/adminregisteradmin`} 
                    state={[email,role,name]}>
                      <a className={`nav-link ${
                          data.pathname =='/adminregisteradmin' ? "active" : null
                        }`} >
                      <i className="nav-icon fas fa-thin fa-user-tie" />
                      Register Admin
                      </a>
                </Link>
            </li>
           
           {/* <li className="nav-header">LABELS</li>
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
            </li> */}
          </ul>
                
          
             
          
        </nav>
      </div>
    </aside>
      </div>
    )
}
