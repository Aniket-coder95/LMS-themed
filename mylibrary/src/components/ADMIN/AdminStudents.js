import React from 'react'
import AllStudents from '../Admin/AllStudents'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'


export default function AdminStudents(){
    return(
        <>
        <Header />
        <Menu />
            <div className="content-wrapper">
                <h3 className='card-header'>All Registered Students</h3>
                <section className="content">
                    <AllStudents />
                </section>
            </div>
        <Footer />
        </>
    )
}