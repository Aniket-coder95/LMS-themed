import React from 'react'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'
import Books from '../Student/books'


export default function BorrowBooks(){
    return(
        <>
        <Header />
        <Menu />
        <div className="content-wrapper">
            <h3 className='card-header'>All Available Books </h3>
            <section className="content">
                <Books/>
            </section>
        </div>
        <Footer />
        </>
    )
}