import React from 'react'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'
import AddBooks from '../Librarian/AddBook'

export default function LibrarianAddBooks(){
    return(
        <>
        <Header />
        <Menu />
        <div>
            <div className="content-wrapper">
                <h3 className='card-header'>All Registered Students</h3>
                <section className="content">
                    <AddBooks />
                </section>
            </div>
        </div>
        <Footer />
        </>
    )
}