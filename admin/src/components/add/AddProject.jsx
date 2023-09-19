import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useDispatch } from "react-redux";


import { isAuthenticated } from "../../auth";

import {  addProject, getProjects } from "../../store/actions/projectActions";
const AddEmployee = () => {
  const dispatch = useDispatch()
  const { user, token } = isAuthenticated();
 
  const [values, setValues] = useState({
    name: "",
    desc: "",
    success: false,
    error: false,
  });

  const { name, desc, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });

    addProject(user._id, token, { name, desc }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          name: "",
         desc : "",

          success: false,
          error: false,
        });
        dispatch(getProjects(user._id, token))

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
        <label>Description</label>
        <textarea
        
          placeholder="desctiption.."
          value={desc}
          onChange={handleChange("desc")}
        />
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
