import React, { Component } from 'react'
import GetuserDetails from '../GetuserDetails';
import { useLocation } from 'react-router-dom';

export default function Dashboard() {
  const getdata = useLocation();

    return (
      <div>
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box">
                    <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text">CPU Traffic</span>
                      <span className="info-box-number">
                        10
                        <small>%</small>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-thumbs-up" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text">Likes</span>
                      <span className="info-box-number">Date</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-success elevation-1"><i className="fas fa-shopping-cart" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text">Sales</span>
                      <span className="info-box-number">760</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users" /></span>
                    <div className="info-box-content">
                      <span className="info-box-text">New Members</span>
                      <span className="info-box-number">2,000</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">User Detail</h5>
                      <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                          <i className="fas fa-minus" />
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <GetuserDetails email={getdata.state}/>
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </section>
      </div>
      </div>
    )
}
