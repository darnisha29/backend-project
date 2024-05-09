import  { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Form, useFormik } from 'formik';
import Listing from './components/listing/Listing';
import Update from './components/updates/Update';
import TableForm from './components/Form/TableForm';
function App() {
  const [metadata, setMetadata] = useState(null);
  const [tableName,setTableName] = useState('');
  let TABLE = 'employee_data';
  // http://localhost:8000/api/metaInfo?tableNames='employee_data'

  useEffect(() => {
    
    axios
      .get('http://localhost:8000/api/metaInfo/') 
      .then((response) => {
        console.log("here is the response ..........",response.data);
        const result = response.data;
        // const values = Object.values(result);
        // console.log(values);
        

        if (response.data) {
          setMetadata(response.data);
          // console.log("here is the response ..........",metadata);
        }
      })
      .catch((error) => {
        console.error('Error fetching metadata:', error);
      });
  }, []); 

  useEffect(() => {
    console.log(tableName);
  },[setTableName])

  
  const formik = useFormik({
    initialValues: metadata
      ? Object.fromEntries(
          Object.keys(metadata).map((key) => [key, '']) 
        )
      : {}, 
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
    },
  });
  return (
    <div className="App">
      <Listing setTableName = {setTableName} tableName={tableName} TABLE = {TABLE}/>
      <TableForm TABLE= {TABLE} />
      <Update/>
    </div>
  );
}

export default App;

