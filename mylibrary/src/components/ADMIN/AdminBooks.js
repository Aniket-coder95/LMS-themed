import React from 'react'
import AllBooks from '../Admin/BooksAvailable'
import Header from './Header'
import Menu from './Menu'


export default function AdminBooks(){
    return(
        <>
        <Header />
        <Menu />
        <div>
        <div className="content-wrapper">
            <h3 className='card-header'>Books and Details </h3>
            <section className="content">
                <AllBooks />
            </section>
        </div>
      </div>
        </>
    )
}