import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatTime } from '../../utils';

const TimesList = () => {
  const timers =   useSelector((state)=>state.timer.timers)
  return (
      <Paper>
 <List >


{timers.map((time , index)=>{
 const timeSpent = JSON.parse(time.time)


return (
    <>
    <ListItem key={index}>
       
       <ListItemText primary={"Clock In"} secondary={time.clockIn} />
       <ListItemText primary={"Clock Out"} secondary={time.clockOut} />
     

       <ListItemSecondaryAction>
       
       {formatTime(timeSpent.hours)}:{formatTime(timeSpent.minutes)}:{formatTime(timeSpent.seconds)}
                
                 </ListItemSecondaryAction>
     </ListItem>
     <Divider variant="inset" component="li" />
    </>
   
)
})}
</List>

      </Paper>
   
  )
};

export default TimesList;
