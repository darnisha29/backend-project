import React from 'react'
import './listing.css'

const Listing = () => {
    const tables = ["users","company",'profile']
  return (
    <div className='tables-container'>
        <h2>Tables</h2>
      {tables.map((table) => {
        return(
            <p>{table}</p>
        )
      })
      }
    </div>
  )
}

export default Listing
