import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../../auth";


import AddEmployee from "../../components/add/AddEmployee";
import { getEmployees } from "../../store/actions/employeeAction";
import Dialog from "@material-ui/core/Dialog"


import CloseIcon from "@material-ui/icons/Close"


import "./Employees.scss";
import EmployeesTable from "./EmployeesTable";
import { IconButton } from "@material-ui/core";
const Employees = () => {
  const { user, token } = isAuthenticated();
  const employees = useSelector((state) => state.employee.employees)

 
  const [open ,  setOpen] = useState(false)
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch( getEmployees(user._id , token));
   }, []);
  
  
   const getData = (employees)=>{

   }
  return (
    <div className="employees">
    <button onClick={()=>setOpen(true)}>Add</button>

    <Dialog fullWidth maxWidth="lg" open={open} onClose={()=>setOpen(false)} >

    <div style={{display : "flex" , justifyContent : "space-between" , padding : 5}}>
      <h2>Add New Employee</h2>

      <IconButton onClick={()=>setOpen(false)}>
        <CloseIcon />
      </IconButton>
    </div>

    <div style={{padding : 16}}>
    <AddEmployee />
    </div>
   
    
    </Dialog>
  
 
      <EmployeesTable  employees={employees}  ></EmployeesTable>
    </div>
  );
};

export default Employees;
