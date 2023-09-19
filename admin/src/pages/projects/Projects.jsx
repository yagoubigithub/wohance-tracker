import "./Projects.scss"
import React from 'react'
import { isAuthenticated } from "../../auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import {getProjects} from "../../store/actions/projectActions"
import AddProject from "../../components/add/AddProject";
import ProjectsTable from "./ProjectsTable";

const Projects = () => {

    const { user, token } = isAuthenticated();

    const dispatch = useDispatch();
  useEffect(() => {
    dispatch( getProjects(user._id , token));
   }, []);
  
  
  return (
    <div className="projects">



<AddProject />

<ProjectsTable />
    </div>
  )
}

export default Projects