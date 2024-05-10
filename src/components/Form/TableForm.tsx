import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import  { useEffect, useState } from 'react';
import './TableForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ChildComponentProps {
  
 setTableName:any,
  tableName:any,
  TABLE:any
}

// / http://localhost:8000/api/metaInfo?tableNames='employee_data'


const TableForm: React.FC<ChildComponentProps> = ({setTableName,tableName,TABLE}) => {
  
  
    const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    console.log("useEffect..........");
    axios
      .get(`http://localhost:8000/api/metaInfo?tableNames='${tableName}'`) 
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
  }, [tableName]); 


    const formik = useFormik({
        initialValues: metadata
          ? Object.fromEntries(
              Object.keys(metadata).map((key) => [key, '']) 
            )
          : {}, 
        onSubmit: (values) => {
          const fields = values
          axios
      .post(`http://localhost:8000/api/data?tableName=${tableName}`,{fields}) 
      .then((response) => {
        toast.success("submited successfully!");
        console.log("here is the response ..........",response.data);
        const result = response.data;
        console.log(result);
      })
      .catch((error) => {
        console.error('Error fetching metadata:', error);
      });

          // http://localhost:8000/api/data?tableName=company_data
          console.log('Form submitted with values:', values);
        },
      });
  return (
    <div className='form-container'>
      <h2>Form</h2>
      {metadata ? (
        <form onSubmit={formik.handleSubmit} className='form'>
          {metadata.map((field) => (
            <div key={field['columnName']} className='form-fields'>
              <label htmlFor={field['columnName']}>{field['columnName']}</label>
              <br></br>
              <input
                id={field['columnName']}
                name={field['columnName']}
                type={metadata[field] === 'int' ? 'number': metadata[field]}
                onChange={formik.handleChange}
                value={formik.values[field]}
              />
            {/* <label htmlFor={field}>{metadata[field]}</label> */}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Loading metadata...</p>
      )}
    </div>
  )
}

export default TableForm
