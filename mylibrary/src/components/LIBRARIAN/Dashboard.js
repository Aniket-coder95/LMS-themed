import React from 'react'
import GetuserDetails from '../GetuserDetails';
import { useLocation } from 'react-router-dom';
import AddNewBooks from './AddNewBooks'


export default function Dashboard () {
  const getdata = useLocation();
    return (
      <div className="content-wrapper">
          <section className="content">
            <GetuserDetails email={getdata.state}/>
          </section>
          <section className="content">
            <AddNewBooks />
          </section>
        </div>
    )
}
