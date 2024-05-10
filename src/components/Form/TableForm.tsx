  import React from 'react';
  import axios from 'axios';
  import { useFormik } from 'formik';
  import  { useEffect, useState } from 'react';
  import './TableForm.css';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { validateYupSchema } from 'formik';
  import { number } from 'yup';
  import * as Yup from 'yup'; 

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
            const data = metadata

            // data.forEach((field:any) => {
            //   console.log(field);
            //   if(field['dataType'] === 'int'||'float'||'double')
            //     {
            //       field['dataType'] = 'number'
            //     }
            //     if(field['dataType'] === 'string' || 'varchar')
            //       {
            //         field['dataType'] = 'text'
            //       }
            //       if(field['columnName'] === 'password'){
            //         console.log( field['columnName']);
            //         field['dataType'] = 'password'
            //         console.log(field['dataType']);

            //       }
            //       if(field['columnName'] === 'email'){
            //         field['dataType'] = 'email'
            //       }
            //       // if(field['type'])
            // })
            // setMetadata(data);
            console.log("here is the response ..........",data);
          }
        })
        .catch((error) => {
          console.error('Error fetching metadata:', error);
        });
    }, [tableName]); 

    const validationSchema = Yup.object(
      metadata.reduce((schema:any, field:any) => {
        const fieldName = field['columnName'];
        const fieldType = field['dataType'];
        
      
        if (fieldType === 'int' || fieldType === 'float') {
          schema[fieldName] = Yup.number().required(`${fieldName} is required`);
        } else if (fieldType === 'text'){
          schema[fieldName] = Yup.string().required(`${fieldName} is required`);
        }

        return schema;
      }, {})
    );

      const formik = useFormik({
          initialValues: metadata
            ? Object.fromEntries(
                Object.keys(metadata).map((key) => [key, '']) 
              )
            : {}, 
            validationSchema,
          onSubmit: (values,{resetForm}) => {
            const fields = values
            axios
            .post(`http://localhost:8000/api/data?tableName=${tableName}`,{fields}) 
            .then((response) => {
              toast.success("submited successfully!");
              console.log("here is the response ..........",response.data);
              const result = response.data;
              console.log(result);
              resetForm()
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
                  type={field['dataType'] === 'int' ? 'number': field['columnName'] === 'password'? 'password':'text'}
                  onChange={formik.handleChange}
                  value={formik.values[field]}
                /> 
                {formik.touched[field['columnName']] && formik.errors[field['columnName']] && (
                  <div className="error-message">{formik.errors[field['columnName']]}</div>)}
              {/* <label htmlFor={field}>{field['dataType']}</label> */}
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



