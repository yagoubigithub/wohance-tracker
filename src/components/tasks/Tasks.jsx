import {
  Avatar,
  Grid,
  IconButton,
  List,
 
  TextField,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import { Link, useParams } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";

import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const Tasks = () => {
  let { projectIndex} = useParams();
  console.log(projectIndex)
  const projects =  useSelector((state) => state.project.projects);
  let tasks = projects[projectIndex] ? projects[projectIndex].tasks :  [];

  return (
    <div>
      <Link to="/">
        {" "}
        <ArrowBackIosIcon /> projects
      </Link>

      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        style={{
          marginTop: "1rem",
          padding: 0,
        }}
      >
        <Grid item>
          <IconButton aria-label="menu">
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search Task ..."
          />
        </Grid>
      </Grid>

      <List>
        {tasks.map((task,index) => {
          return (
           <TaskItem projectIndex={projectIndex} task={task} key={index}  />
          );
        })}
      </List>
    </div>
  );
};

export default Tasks;
