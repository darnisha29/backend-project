import React from 'react'
import  { useEffect, useState } from 'react';
import '../App.css'
import axios from 'axios';
import { Form, useFormik } from 'formik';

// import Update from './components/updates/Update';
// import TableForm from './components/Form/TableForm';
import Listing from '../components/listing/Listing';
import Update from '../components/updates/Update';
import TableForm from '../components/Form/TableForm';

const FormPage = () => {
    const [metadata, setMetadata] = useState(null);
  const [tableName,setTableName] = useState('employee_data');
  const [entries,setEntries] = useState(false);
  let TABLE = 'employee_data';
  return (
    <div className='App'>
      
      
      <Listing setTableName = {setTableName} tableName={tableName} TABLE = {TABLE}/>
      <TableForm TABLE= {TABLE} setTableName = {setTableName} tableName={tableName}/>
      {/* <Update TABLE= {TABLE} setTableName = {setTableName} tableName={tableName}/> */}
    </div>
  )
}

export default FormPage
