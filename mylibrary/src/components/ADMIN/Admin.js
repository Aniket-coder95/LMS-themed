import React, { Component } from 'react'
import Dashboard from './Dashboard'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'


export default function Admin() {
  
    return (
      <div>
          <Header />
          <Menu />
          <Dashboard />
          <Footer />
      </div>
    )
}
