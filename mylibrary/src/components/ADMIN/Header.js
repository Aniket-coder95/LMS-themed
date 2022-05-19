import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default function Header () {

    function logout(){
      window.localStorage.clear();
      window.location.href='/';
    }

    return (
      <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars" /></a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a className="nav-link">Home</a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a  className="nav-link">Contact</a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" data-widget="navbar-search" role="button">
                <i className="fas fa-search" />
              </a>
              <div className="navbar-search-block">
                <form className="form-inline">
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-append">
                      {/* <button className="btn btn-navbar" type="submit">
                        <i className="fas fa-search" />
                      </button> */}
                      <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" data-widget="fullscreen"  role="button">
                <i className="fas fa-expand-arrows-alt" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-widget="control-sidebar" data-slide="true"  role="button">
              <p >
                 <button onClick={logout}>
                 <i class="fas fa-solid fa-skull-crossbones">Logout</i>
                 </button>
                
              </p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
}
