import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { Location } from 'history';

interface State {
    Name?: string;
  }

const EntriesPage = () => {
    const [entryData, setEntryData] = useState<Record<string, any>>({});
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
          console.log("here is the response .......... in Entries page",response.data);
        //   setTables(response.data.data)
        setEntryData(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching metadata:', error);
        });
    },[]);
  return (
    <div>
      {entryData  && Object.keys(entryData).map((data,index) => {
        return(
            <p key={index}>{data}: {entryData[data]}</p>
        )
      })
      

      }
    </div>
  )
}

export default EntriesPage
