import React, { useEffect } from "react";

import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useSelector } from 'react-redux'

import { Link } from "react-router-dom";

const ProjectsTable = () => {

    const handleDelete = (id) => {
        //   setData(data.filter((item) => item.id !== id));
         };
         const columns = [
           
           {
             field: "name",
             headerName: "Name",
             renderCell: (params) => {
              return (
                <>

<Link to={"/dashboard/project/" + params.row._id}>{params.row.name}</Link>
</>

                )
                }
           
           },
           { field: "desc", headerName: "Description", flex : 1 },
           {
             field: "action",
             headerName: "Action",
            flex : 1 ,
             renderCell: (params) => {
               return (
                 <>
                   <Link to={"/dashboard/task/add/" + params.row._id}>
                     <button className="userListEdit">Add Task</button>
                   </Link>
                   <Link to={"/edit/user/" + params.row._id}>
                     <button className="userListEdit">Edit</button>
                   </Link>
                   <DeleteOutline
                     className="userListDelete"
                     onClick={() => handleDelete(params.row.id)}
                   />
                 </>
               );
             },
           },
         ];

  
    const projects = useSelector((state)=> state.project.projects)
   
  return (
    <div>


<DataGrid
        rows={projects}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={8}
        checkboxSelection
        autoHeight
        disableSelectionOnClick
      />
    </div>
  )
}

export default ProjectsTable