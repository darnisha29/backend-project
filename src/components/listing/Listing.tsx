import React, { useEffect, useState } from 'react'
import './listing.css'
import axios from 'axios';

interface ChildComponentProps {
  tableName: any; 
  setTableName: any; 
  TABLE:any
}


const Listing: React.FC<ChildComponentProps> = ({tableName,setTableName,TABLE}) => {
    // const tables = ["users","company",'profile']
    const [tables ,setTables] = useState([])
    
    useEffect(() => {
    
      axios
        .get('http://localhost:8000/api/tableNames') 
        .then((response) => {
          console.log("here is the response .......... in listing",response.data.data);
          setTables(response.data.data)
      
        })
        .catch((error) => {
          console.error('Error fetching metadata:', error);
        });
    }, []);
    useEffect(() => {
      console.log(tableName);
    },[setTableName]) 
    function clickHandler(table:string): void {
      // console.log(table);
      setTableName(table);
      
      TABLE=table;
      console.log(TABLE);
    }
  return (
    <div className='tables-container'>
        <h2>Tables</h2>
      {tables?tables.map((table:string,index:any) => {
        

        return(
            <p key={index} onClick={() => clickHandler(table)}>{table}</p>
        )
      })
      : (null)}
    </div>
  )
}

export default Listing
