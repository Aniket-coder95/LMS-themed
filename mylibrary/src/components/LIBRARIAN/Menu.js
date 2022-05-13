import React from 'react'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
export default function Menu () {
  const data = useLocation();
  // console.log(data.pathname);
  const name = data.state[2];
  const role = data.state[1];
  const email =data.state[0];
    return (
      <div>
          <aside className="main-sidebar sidebar-dark-primary elevation-4">
      
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
        
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item menu-open" >
                <Link to={`/librariandashboard`} 
                    state={[email,role,name]}>
                      <a 
                         className={`nav-link ${
                          data.pathname =='/librariandashboard' ? "active" : null
                        }`} >
                      <i className="nav-icon fas fa-tachometer-alt" />
                      Dashboard
                      </a>
                </Link>
            </li>


            <li className="nav-item menu-open">
            <Link to={`/librarianaddbooks`} 
                    state={[email,role,name]}>
                      <a 
                         className={`nav-link ${
                          data.pathname =='/librarianaddbooks' ? "active" : null
                        }`} >
                      <i className="nav-icon fas fa-thin fa-book" />
                      Books
                      </a>
                </Link>
            </li>

            <li className="nav-item menu-open">
                <Link to={``} 
                    state={[email,role,name]}>
                      <a className={`nav-link ${
                          data.pathname =='/' ? "active" : null
                        }`} >
                      <i className="nav-icon fas fa-thin fa-address-book" />
                      Contact
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
