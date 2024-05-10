import React, { useEffect, useState } from 'react'
import './listing.css'
import axios from 'axios';

interface ChildComponentProps {
  tableName: any;
  setTableName: any;
  TABLE: any;
}

const Listing: React.FC<ChildComponentProps> = ({ tableName, setTableName, TABLE }) => {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('employee_data');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/tableNames')
      .then((response) => {
        console.log("here is the response .......... in listing", response.data.data);
        setTables(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching metadata:', error);
      });
  }, []);

  function clickHandler(table: string): void {
    console.log("table", table);
    setTableName(table);
    setSelectedTable(table);
  }

  return (
    <div className='tables-container'>
      <h2>Tables</h2>
      {tables ? tables.map((table: string, index: number) => {
        const isSelected = selectedTable === table;
        return (
          <p key={index} className={isSelected ? 'selected-table' : ''} onClick={() => clickHandler(table)}>{table}</p>
        );
      })
        : (null)}
    </div>
  );
}

export default Listing;
