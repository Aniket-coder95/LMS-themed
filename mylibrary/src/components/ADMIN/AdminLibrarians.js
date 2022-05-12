import React from 'react'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'
import AllLibrarians from '../Admin/AllLibrarians'

export default function AdminLibrarians(){
    return(
        <>
        <Header />
        <Menu />
        <div className="content-wrapper">
            <h3 className='card-header'>All Registered Librarians</h3>
            <section className="content">
                <AllLibrarians />
            </section>
        </div>
        <Footer />
        </>
    )
}