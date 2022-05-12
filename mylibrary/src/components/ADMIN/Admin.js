import React from 'react'
import Dashboard from './Dashboard'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

export default function Admin() {
  return (
    <>
    {/* {isrender ? ( */}
      <div>
          <Header />
          <Menu />
          <Dashboard />
          <Footer />
      </div>
    {/* ): <p></p>} */}
    </>
  )
}
