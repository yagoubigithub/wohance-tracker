import React, { useEffect } from 'react';
import {
  HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

//mui

import Paper from '@material-ui/core/Paper';



import Projects from '../projects/Projects';
import Tasks from '../tasks/Tasks';
import Task from '../task/Task';
import { isAuthenticated } from '../../auth';
import { useDispatch } from 'react-redux';
import { getProjects } from '../../store/actions/projectActions';

const TimeTraking = () => {
  const dispatch = useDispatch()
  const {employee, token} = isAuthenticated()
  console.log(employee)
  useEffect(()=>{
   
    dispatch(getProjects(employee , token))
   
  },[])
  return <Paper style={{overflow : "hidden"}}>

<Router >
<Switch>
          <Route exact path="/">
         
         <Projects />
          </Route>

          <Route exact path="/tasks/:projectIndex">
         
         <Tasks />
          </Route>
      
          <Route exact path="/task/:projectIndex/:taskId">
         
         <Task />
          </Route>
      
      
        </Switch>
</Router>








  </Paper>;
};

export default TimeTraking;
