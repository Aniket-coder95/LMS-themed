import React, { Component } from 'react'
import Menu from '../../Menu'
import Header from '../../Header'
import Footer from '../../Footer'
import Dashboard from '../../Dashboard'

export default class test extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Header />
        <Dashboard />
        <Footer />
      </div>
    )
  }
}
