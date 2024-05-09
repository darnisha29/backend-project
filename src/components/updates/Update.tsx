import React from 'react';
import './Updates.css';

const Update = () => {
  return (
    <div className='updates-container'>
        <div className='updates-buttons'>
      <button>Form</button>
      <button>Entries</button>
        </div>
        <div className='content'>
            <p>Created by: </p>
            <p>Updated by: </p>
        </div>
    </div>
  )
}

export default Update
