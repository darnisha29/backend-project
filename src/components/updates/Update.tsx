import React from 'react';
import './Updates.css';
import { Link, To } from 'react-router-dom';

interface ChildComponentProps {
  
  setTableName:any,
   tableName:any,
   TABLE:any
 }

const Update: React.FC<ChildComponentProps> = ({setTableName,tableName,TABLE}) => {
  console.log("in the update component",tableName);
  const name = tableName
  return (
    <div className='updates-container'>
        <div className='updates-buttons'>
      <button>Form</button>
      <button><Link to = {{
        pathname: `/Entries/${tableName}`,
        
      } as To } className='link'>Entries</Link></button>
        </div>
        <div className='content'>
            <p>Created at: </p>
            <p>Updated at: </p>
        </div>
    </div>
  )
}

export default Update

{/* <Link to={{
  pathname: `/product-detail/id =${item.id}`,
  state: { product: item } // Pass the entire product object as state
} as To} key={item.id} className='card'> */}
