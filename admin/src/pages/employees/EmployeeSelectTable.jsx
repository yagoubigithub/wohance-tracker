import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Email',
        selector: row => row.email,
    }
];




const EmployeeSelectTable = ({defaultSelectedEmployees ,employees    ,setData}) => {
    console.log(defaultSelectedEmployees)
    
    const [selectedEmployees, setSelectedEmployess] = useState([])

    useEffect(()=>{

        setData(selectedEmployees)
    }, [selectedEmployees])
  return (
    <div>
         <DataTable
            columns={columns}
            data={employees}
            selectableRows
            onSelectedRowsChange={(val)=>{
                setSelectedEmployess(val.selectedRows)
            }}
            pagination
        
        />
    </div>
  )
}

export default EmployeeSelectTable