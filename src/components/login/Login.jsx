import React, { useState } from "react";

import { useDispatch } from "react-redux";

import {Alert} from "@material-ui/lab/"
import { authenticate, signin} from "../../auth";
import { Redirect } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
 

  const [values, setValues] = useState({
   
    email: "",
    password: "",
    userId : "",
  
    success: false,
    error: false,
  });

  const {  email, password,userId ,  error, success } =
    values;

    const handleChange = (name) => (event) => {
      setValues({ ...values, error: false, [name]: event.target.value });
      
    };
  const handleSubmit = (e) => {
    e.preventDefault();
   

    

    setValues({ ...values, error: false });

    signin({ email,userId ,  password }).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
         
          authenticate(data, ()=>{
            setValues({
                ...values,
                success: true,
              });
          })
         
        }
      }
    );
      


  };
  const loginForm = () =>{
    return (  <form onSubmit={handleSubmit}>
      <input
        type="email"
        onChange={handleChange("email")}
        placeholder="Email"
        value={email}
      />

<input
        type="password"
        onChange={handleChange("password")}
        placeholder="password"
        value={password}
      />
      <br />
      <input
        type="text"
        onChange={handleChange("userId")}
        placeholder="Admin Id"
        value={userId}
      />
      <button>submit</button>
    </form>)
  }

  const showError = () => (
    <Alert severity="error"
   
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </Alert>
  );

  const showSuccess = () =>{
    if(success) window.location.reload();
  };
  return (
    <div className="login">
      <h1>Login</h1>
      {showSuccess()}
      {showError()}
      {loginForm()}
    
    </div>
  );
};

export default Login;
