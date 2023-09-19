import React, { useEffect } from "react";

import DataTable from 'react-data-table-component';


import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";



const EmployeesProjectTable = ({ employeesId = [] }) => {

  
 
 const [_employees , _setEmployees] = useState([])
  const employees = useSelector((state)=>state.employee.employees)
 
  useEffect(()=>{
      const e = []
      console.log(employeesId)
      
      employeesId.map(id=>{

       const employee =  employees.filter((employee)=>employee._id === id)[0]
      
       if(employee){
           e.push(employee)
       }
    })
    _setEmployees(e)
  },[employeesId ,employees])
 
  



 

  const handleDelete = (id) => {
    //   setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    {
      selector: "username",
      name: "Username",
    },
    { selector: "email", name: "Email", flex: 1 },
    {
      selector: "phone",
      name: "Phone",

      flex: 1,
    },
    {
      selector: "role",
      name: "Role",
      flex: 1,
      renderCell: (params) => {
        return <>{params.row.role === 0 ? "User" : "Admin"}</>;
      },
    },
    {
      selector: "action",
      name: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
         {  <>

          <Link to={"/edit/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
         </> }
          </>
        );
      },
    },
  ];



  return (
    <div>
     <DataTable
            columns={columns}
            data={_employees}
            selectableRows
        />
    </div>
  );
};

export default EmployeesProjectTable;
