import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, To, useParams } from 'react-router-dom';
import './entries.css';

const EntriesPage = () => {
  const [entryData, setEntryData] = useState([]);
  const { tableName } = useParams<{ tableName: string }>();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/data?tableNames=${tableName}`)
      .then((response) => {
        setEntryData(response.data.data);
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [tableName]);

  const columns = entryData.length > 0 ? Object.keys(entryData[0]) : [];

  return (
    <div className='main-container'>
      <button>
        <Link to={{ pathname: `/` } as To} className='link'>
          Form
        </Link>
      </button>

      <div className='entries'>
        <h2>Data for Table: {tableName}</h2>

        {entryData.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th> {/* Row numbering */}
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entryData.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td> {/* Row number */}
                  {columns.map((column) => (
                    <td key={column}>{entry[column]}</td> 
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Data Available</p>
        )}
      </div>
    </div>
  );
};

export default EntriesPage;
