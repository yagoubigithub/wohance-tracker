import { Alert } from "@material-ui/lab";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { isAuthenticated } from "../../auth";

import { getEmployees, addEmployee } from "../../store/actions/employeeAction";
const AddEmployee = () => {
  const { user, token } = isAuthenticated();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    nbScreenshotsInHour : "0",

    success: false,
    error: false,
  });

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
        <label>Password</label>
        <input
          type="password"
          placeholder="password..."
          value={password}
          onChange={handleChange("password")}
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

      <button onClick={clickSubmit}>Add</button>
    </form>
  );
  return (
    <div>
      {showSuccess()}
      {showError()}
      {addEmployeeForm()}
    </div>
  );
};

export default AddEmployee;
