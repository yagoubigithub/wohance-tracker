import React from 'react';
import "./AdminDashboard.scss"
import {  Switch, Route } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar"
import Employees from '../employees/Employees';
import Navbar from '../../components/navbar/Navbar';
import Projects from '../projects/Projects';
import AddTask from '../../components/add/AddTask';
import Project from '../projects/Project';
import Task from '../task/Task';
import EditEmployee from "../employees/EditEmployee"


const AdminDashboard = () => {

 
 
  return <div>
  <Navbar />
 <div className='container-dashboard'>

<Sidebar />
<Switch>
      <Route exact path="/dashboard">
       <Employees />
      </Route>

      <Route exact path="/dashboard/project">
      <Projects />
      </Route>

      <Route  exact path="/dashboard/project/:projectId">
      <Project />
      </Route>

      <Route exact  path="/dashboard/task/add/:projectId">
      <AddTask />
      </Route>

      <Route exact  path="/dashboard/task/:taskId">
      <Task />
      </Route>

      <Route exact  path="/dashboard/edit/employee/:employeeId">
      <EditEmployee />
      </Route>
     </Switch>
</div>
  </div>;
};

export default AdminDashboard;
