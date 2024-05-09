import  { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { useFormik } from 'formik';
function App() {
  const [metadata, setMetadata] = useState(null);

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
      {metadata ? (
        <form onSubmit={formik.handleSubmit}>
          {Object.keys(metadata).map((field) => (
            <div key={field}>
              <label htmlFor={field}>{field}</label>
              
              <input
                id={field}
                name={field}
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
  );
}

export default App;

