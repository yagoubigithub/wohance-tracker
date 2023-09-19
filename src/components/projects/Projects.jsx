import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { ListItemSecondaryAction } from '@material-ui/core';

//icons
import SearchIcon from "@material-ui/icons/Search"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';

import { getTimers } from '../../store/actions/TimerActions';
import { isAuthenticated } from '../../auth';


import randomcolor from "randomcolor"


const Projects = () => {
  const {employee, token} = isAuthenticated()
  const dispatch = useDispatch()
  const projects = useSelector((state)=>state.project.projects)
 
  return <div>

<Grid container spacing={1} alignItems="center" justifyContent='center' style={{
marginTop : "1rem" , padding : 0}}>
          <Grid item>
          <IconButton aria-label="menu">
          <SearchIcon />
      </IconButton>
          
          </Grid>
          <Grid item xs={10}>
            <TextField variant="outlined" fullWidth placeholder='Search Project ...' />
          </Grid>
        </Grid>




<div>
<List >


{projects.map((project , index)=>{


return (
    <ListItem key={index}>
        <ListItemAvatar>
        <Avatar style={{backgroundColor :  randomcolor()}} >{project.name[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={project.name} secondary={new Date(project.tasks.reduce((p,c)=> p + c.time_spent , 0)  * 1000).toISOString().substr(11, 8) }/>

        <ListItemSecondaryAction>
                   <Link to={`/tasks/${index}`}>{project.tasks.length} Task <ArrowForwardIosIcon /></Link>
                  </ListItemSecondaryAction>
      </ListItem>
)
})}
</List>

</div>

        

  </div>;
};

export default Projects;
