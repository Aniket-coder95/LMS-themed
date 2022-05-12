import React from 'react'
import GetuserDetails from '../GetuserDetails';
import { useLocation } from 'react-router-dom';
import AddNewBooks from './AddNewBooks'


export default function Dashboard () {
  const getdata = useLocation();
    return (
      <div>
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>T_books</h3>
                      <p style={{color:"black"}}>Total Books Available</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag" />
                    </div>
                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>T_users-1<sup style={{fontSize: 20}}></sup></h3>
                      <p style={{color:"black"}}>Total Users</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars" />
                    </div>
                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>T_students</h3>
                      <p style={{color:"black"}}>Students</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>T_librarians</h3>
                      <p style={{color:"black"}}>Librarians</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
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
                    <div id="world-map" style={{ width: '100%'}} />
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