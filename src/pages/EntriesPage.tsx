import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, To, useLocation, useParams } from 'react-router-dom';
import { Location } from 'history';
import { object } from 'yup';
import './entries.css'

interface State {
    Name?: string;
  }

const EntriesPage = () => {
    const [entryData, setEntryData] = useState<Record<string, any>>([]);
//     const location = useLocation();
  
//   const state = location.state as State;

//   // Access the value passed through the state
//   console.log("here is the table name",state);
//   const tableName = state?.Name ?? 'DefaultTable';

const { tableName } = useParams<{ tableName: string }>();
console.log("here is the table name",tableName);

    useEffect(() => {

        axios
        .get(`http://localhost:8000/api/data?tableNames=${tableName}`) 
        .then((response) => {
        //   console.log("here is the response .......... in Entries page",response.data);
        //   console.log("here is the response .......... in Entries page",response.data);
        //   setTables(response.data.data)
        setEntryData(response.data.data);
        console.log(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching metadata:', error);
        });
    },[]);
  return (
    
      <div className='main-container'>
        <button><Link to = {{
        pathname: `/`,
        
      } as To } className='link'>Form</Link></button>
      <div className='entries'>
      <h2>Data for Table: {tableName}</h2>
      
      {entryData ? (
        entryData.map((object:any, index:any) => (
          <div key={`object-${index}`}>
            
            <h3> {index + 1}</h3> {/* Using index to number objects */}
            <p> {'{'} </p>
            {Object.entries(object).map(([key, value], subIndex) => (
              <p key={`entry-${index}-${subIndex}`}>
                {key}: "{object[key]}"
              </p>
            ))}

            <p> {'}'} </p>
          </div>
        ))
      ) 
      : (
        <p>No Data Available</p>
      )
      }
      </div>
    </div>

  )
}

export default EntriesPage
