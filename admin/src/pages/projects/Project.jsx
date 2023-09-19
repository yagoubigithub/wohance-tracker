import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { isAuthenticated } from "../../auth";
import {
  getTasks,
  updateTaskStatus,
  setEmployeesInProject,
  getProjects,
} from "../../store/actions/projectActions";
import { useState } from "react";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import EmployeesTable from "../employees/EmployeesTable";
import { getEmployees } from "../../store/actions/employeeAction";
import EmployeesProjectTable from "../employees/EmployeesProjectTable";
import EmployeeSelectTable from "../employees/EmployeeSelectTable";

const Project = () => {
  const { user, token } = isAuthenticated();
  const columns = ["To Do", "On Hold", "In Progress", "Done"];

  const dispatch = useDispatch();
  const { projectId } = useParams();
  const project = useSelector((state) =>
    state.project.projects.filter((_p) => _p._id === projectId)
  )[0];
  const tasks = useSelector((state) => state.project.tasks);
  const [filtredTasks, setFiltredTasks] = useState({});

  useEffect(() => {
    dispatch(getTasks(projectId, token));
    dispatch(getProjects(user._id, token));
    dispatch(getEmployees(user._id, token));
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  useEffect(() => {
    const filtredTasks = {};
    columns.map((col, index) => {
      filtredTasks[index] = tasks
        .filter((_t) => _t.status === col)
        .sort(function (a, b) {
          return a.index - b.index;
        });
    });
    setFiltredTasks(filtredTasks);
  }, [tasks]);
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
  

    const dStatus = columns[destination.droppableId.split("-")[1]];
    const sTask = filtredTasks[source.droppableId.split("-")[1]][source.index];
    if (source.droppableId !== destination.droppableId) {
      const [removed] = filtredTasks[source.droppableId.split("-")[1]].splice(
        source.index,
        1
      );
      filtredTasks[destination.droppableId.split("-")[1]].splice(
        destination.index,
        0,
        removed
      );
      setFiltredTasks(filtredTasks);
    } else {
      filtredTasks[source.droppableId.split("-")[1]] = reorder(
        filtredTasks[source.droppableId.split("-")[1]],
        source.index,
        destination.index
      );
      setFiltredTasks(filtredTasks);
    }

    dispatch(updateTaskStatus(sTask, dStatus, destination.index, token));
    //   dispatch(setTaskStatus(destination.droppableId.split("-")[1] , ))
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
    height: 300,
    margin: grid,
  });
  return (
  <>
    {project  &&   <div style={{ flex: 4 }}>
      <h3>
        {project && project.name}{" "}
        <Link to={"/dashboard/project/edit/" + projectId}>
          <button className="userListEdit">Edit</button>
        </Link>
      </h3>

      <Link to={"/dashboard/task/add/" + projectId}>
        <button className="userListEdit">Add New Task</button>
      </Link>

<h1>Tasks</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {columns.map((col, index) => (
            <Droppable
              key={`droppableId-${index}`}
              droppableId={`droppableId-${index}`}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  <h3>{col}</h3>
                  {filtredTasks[index] &&
                    filtredTasks[index].map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Link to={`/dashboard/task/${task._id}`}>
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {task.name}
                          </div>
                          </Link>
                        )}
                      </Draggable>
                    ))}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <AssignEmployees project={project} />
      <EmployeesProjectTable employeesId={project.employees} />
    </div>}
  </>
  );
};

const AssignEmployees = ({ project }) => {

  const { token } = isAuthenticated();
  const employees = useSelector((state) => state.employee.employees);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState( []);
  const dispatch = useDispatch();

  const onClose = () => {
    setOpenDialog(false);
  };
  const getData = (employees) => {
    
    setSelectedEmployees(employees);
  };
  return (
    <>
      <button onClick={() => setOpenDialog(true)}>Assign Employee</button>

      <Dialog onClose={onClose} open={openDialog} fullWidth maxWidth="lg">
        <DialogContent>

        
        <EmployeeSelectTable  setData={getData} defaultSelectedEmployees={ project.employees}
            employees={employees} />
      {/*     <EmployeesTable
            noActions
            setData={getData}
            defaultSelectedEmployees={ project.employees}
            employees={employees}
          /> */}
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              dispatch(
                setEmployeesInProject(project._id, selectedEmployees, token)
              );
              setOpenDialog(false);
            }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
      
   
     
    </>
  );
};

export default Project;
