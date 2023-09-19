import React, { useEffect } from "react";

import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";


import DataTable from 'react-data-table-component';




const EmployeesTable = ({   employees = []  , noActions =false , noCheckbox = false}) => {

 
  
 



 

  const handleDelete = (id) => {
    //   setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    {
      name: 'Username',
      selector: row => row.name,
    }
    ,
    {
      name: 'email',
      selector: row => row.email,
    },
    {
      name: 'phone',
      selector: row => row.phone,
    },

    {
      name: 'Role',
      selector: row => row.role === 0 ? "User" : "Admin",
    },
    
    
    {
    
      name: "Action",
    
      selector: (row) => {
        return (
          <>
         {  !noActions &&<>

          <Link to={"/dashboard/edit/employee/" + row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(row._id)}
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
            data={employees}
            selectableRows
        />
      {/* <DataGrid
        rows={employees}
      
        getRowId={row => row._id}
        columns={columns}
        pageSize={8}
        checkboxSelection={!noCheckbox}
        selectionModel={defaultSelectedEmployees}
        autoHeight
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel) => {
        
          setSelectionModel(newSelectionModel);
        }}
      /> */}
    </div>
  );
};

export default EmployeesTable;
