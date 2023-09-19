import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { useStopwatch } from "react-timer-hook";
import { Link } from 'react-router-dom';

import { calcultTime, formatTime } from "../../utils";
import { useDispatch } from 'react-redux';

import {setTaskTime , startRecordActiveWin , stopRecordActiveWin} from "../../store/actions/projectActions"
import { useSelector } from 'react-redux';

import {isAuthenticated} from "../../auth/index"
import randomcolor from "randomcolor"
const TaskItem = ({task, projectIndex}) => {

  const {employee , token} = isAuthenticated()
    const dispatch = useDispatch()
    const active = useSelector((state)=>state.timer.active)

    const time_spent = task.times.reduce((total , current)=>{

      const time = JSON.parse(current.time)

      total += time.seconds + time.minutes * 60 + time.hours *60 *60
      return total;
    } , 0)
    const [clockIn, setClockIn] = useState("");
    const [timeIn, setTimeIn] = useState({});
  const   stopwatchOffset = new Date();
           stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + time_spent);
    const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false ,  offsetTimestamp  : stopwatchOffset });
   


    const _start =(taskId) =>{
      if(active){
        const d = new Date();
        const n = d.toLocaleTimeString().split(":");

        setClockIn(n[0] + ":" + n[1]);
        setTimeIn({seconds , minutes , hours})
        dispatch(startRecordActiveWin(employee._id , taskId, token  ))
        start()
      }else{
        alert("You can't start working on project until you clockIn")
      }
       
    }

    const _pause = (task) =>{
        const d = new Date();
        const n = d.toLocaleTimeString().split(":");
        dispatch(stopRecordActiveWin(    n[0] + ":" + n[1] ))

      const time =   calcultTime({hours , minutes , seconds} ,  timeIn)
       dispatch(setTaskTime(time ,clockIn  ,  n[0] + ":" + n[1]  ,  employee._id ,  task._id , token  ))
     
        pause()
    }

  return  (<>{
  
  <ListItem>
  <ListItemAvatar>
    <Avatar style={{backgroundColor :  randomcolor()}} >{task.name[0].toUpperCase()}</Avatar>
  </ListItemAvatar>
  <ListItemText
    primary={<Link to={"/task/" + projectIndex + "/"+ task._id}>{task.name}</Link>}
    secondary={task.priority}
  />

  <ListItemSecondaryAction>
   {<span>    {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</span>} <button
    onClick={isRunning ? ()=> _pause (task)  : ()=> _start(task._id)}  >{isRunning ? "Stop" :  "Start"}</button>
  </ListItemSecondaryAction>
</ListItem> } </>);
};

export default TaskItem;
