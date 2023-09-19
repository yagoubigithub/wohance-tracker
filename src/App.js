import "./App.css";
import React, { useEffect, useState } from "react";

import { Tabs } from "rmc-tabs";
import "rmc-tabs/assets/index.css";
import Attendence from "./components/attendence/Attendence";

import TimeTraking from "./components/time_traking/TimeTraking";
import TimesList from "./components/timeslist/TimesList";
import { useDispatch, useSelector } from "react-redux";
import { getComputerInfo, getSetting } from "./store/actions/employeeAction";
import Login from "./components/login/Login";
import { getEventMainProcess } from "./utils/index";
import {BrowserRouter} from "react-router-dom"
import { isAuthenticated , signout } from "./auth";
import { getProjects } from './store/actions/projectActions';

import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const App = () => {
 
  const dispatch = useDispatch()
  
  const {employee ,token}  = isAuthenticated()

  
  useEffect(()=>{

    dispatch(getComputerInfo())
    if(isAuthenticated()){
      getEventMainProcess(employee._id, token)
    }
   

   
    
  }, [])


  const refresh = () =>{
    dispatch(getProjects(employee , token))
  }
 
  const logout = ()=>{
    signout(()=>{
      window.location.reload()
    })
  }
  return (
    <BrowserRouter>
  <div>
    {isAuthenticated() ?<>
      <Tabs
        tabs={[
          { key: "t1", title: "Attendence" },
          { key: "t2", title: " Time traking" },
        ]}
        initalPage={"t1"}
      
      >
        <div key="t1" style={{ overflowX: "hidden"  , overflowY : "auto" , height :" calc(100vh - 31px - 60px)"}}>
       
          <Attendence />
          <hr />
          <TimesList />
        </div>
        <div key="t2"  style={{ overflowX: "hidden"  , overflowY : "auto" , height :" calc(100vh - 31px - 60px)"}}>
          <TimeTraking />
        </div>
      </Tabs>

      <div style={{height : 60 , display : "flex" , justifyContent : "space-between" , alignItems :  "center"}}>
        <IconButton  size="large" onClick={refresh}>
          <RefreshIcon  />
        </IconButton>
        <IconButton onClick={logout}> 
          <ExitToAppIcon />
        </IconButton>
      </div>
    </>:
      
     <Login />
       }
      
    </div>
    </BrowserRouter>
  
  );
};

export default App;
