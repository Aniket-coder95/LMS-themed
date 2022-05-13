import React from 'react'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'
import Books from '../Student/books'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

export default function BorrowBooks(){
    const[email , setEmail] = useState('')
    const data = useLocation()

    useEffect(()=>{
        setEmail(data.state)
      })

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