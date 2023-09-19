import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../../auth";

import { getEmployee, addEmployee } from "../../store/actions/employeeAction";
const AddEmployee = () => {
  const { user, token } = isAuthenticated();
  const {employeeId} = useParams()
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    nbScreenshotsInHour : "0",

    success: false,
    error: false,
  });
  useEffect(()=>{

    getEmployee( employeeId , token  ).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...data,
            success: false,
            error: false,
          });
        }
      });
    
  }, [])

  const { name, email, password, nbScreenshotsInHour, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });

    addEmployee(user._id, token, { name, email, password , nbScreenshotsInHour : parseInt(nbScreenshotsInHour) }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          name: "",
          email: "",
          password: "",

          success: false,
          error: false,
        });
      }
    });
  };
  const showError = () => (
    <Alert severity="error" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  const showSuccess = () => (
    <>
      {success && (
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          success
        </div>
      )}
    </>
  );

  const changePasswordForm = () =>(
    <form className="signinForm">
    <br />
    <hr />
    <br />
    <div className="signinItem">


    <label>Change Password</label>
        <input
          type="password"
          placeholder="Change the password.."
          value={password}
          onChange={handleChange("password")}
        />
    
      </div>

      <button onClick={clickSubmit}>Update</button>
  
  </form>
  )

  const addEmployeeForm = () => (
    <form className="signinForm">
      <div className="signinItem">
        <label>Name</label>
        <input
          type="text"
          placeholder="name.."
          value={name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="signinItem">
        <label>Email</label>
        <input
          type="email"
          placeholder="email.."
          value={email}
          onChange={handleChange("email")}
        />
      </div>
 
      <div className="signinItem">
        <label>Number of screenshot in hours</label>
      
      <select onChange={handleChange("nbScreenshotsInHour")} >
        <option value="0">No screenshot</option>
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
        
      </div>

      <button onClick={clickSubmit}>Update</button>
    </form>
  );
  return (
    <div style={{flex : 4}}>
    <Link to={"/dashboard" }>All Employees</Link>
      {showSuccess()}
      {showError()}
      {addEmployeeForm()}

      {changePasswordForm()}
    </div>
  );
};

export default AddEmployee;
