import  { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Form, useFormik } from 'formik';
import Listing from './components/listing/Listing';
import Update from './components/updates/Update';
import TableForm from './components/Form/TableForm';
import { Route, Routes } from 'react-router-dom';
import FormPage from './pages/FormPage';
import EntriesPage from './pages/EntriesPage';
function App() {
  const [metadata, setMetadata] = useState(null);
  const [tableName,setTableName] = useState('employee_data');
  const [entries,setEntries] = useState(false);
  let TABLE = 'employee_data';
  // http://localhost:8000/api/metaInfo?tableNames='employee_data'

  return (
    <div>
      <Routes>
       
      <Route path="/" element={<FormPage />} />
      <Route path="/Entries/:tableName" element={<EntriesPage />} />
      </Routes>
    
      {/* <Listing setTableName = {setTableName} tableName={tableName} TABLE = {TABLE}/>
      <TableForm TABLE= {TABLE} setTableName = {setTableName} tableName={tableName}/>
      <Update/> */}
    </div>
  );
}

export default App;

