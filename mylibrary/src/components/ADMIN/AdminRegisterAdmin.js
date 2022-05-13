import React from 'react'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'
import AddAdmin from '../Admin/AdminRegister'

export default function AdminRegisterAdmin(){
    return(
        <>
        <Header />
        <Menu />
        <div className="content-wrapper">
            <section className='content'>
                <div className="container-fluid">
                    <section className="col-lg connectedSortable">
                        <div className="card bg-gradient-primary">
                            <div className="card-header border-0">
                                <h3 className="card-title">
                                <i className="fas fa-map-marker-alt mr-1" />
                                Add Admins Here
                                </h3>
                                <div className="card-tools">
                                <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <AddAdmin />
                                <div id="world-map" style={{ width: '100%'}}/>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <section>

            </section>
        </div>
        <Footer />
        </>
    )
}