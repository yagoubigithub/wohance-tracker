import { Dialog, DialogTitle } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { isAuthenticated } from "../../auth";

import { addTask, getTasks } from "../../store/actions/projectActions";

import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";

import CloseIcon from "@material-ui/icons/Close";
const AddTask = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    desc: "",
    status: "",
    priority: "",
    success: false,
    error: false,
  });

  const { name, desc, status, priority, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });

    addTask(projectId, token, { name, desc, status, priority }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          name: "",
          desc: "",
          status: "To Do",
          priority: "",

          success: true,
          error: false,
        });
        dispatch(getTasks(projectId, token));
      }
    });
  };
  const showError = () => (
    <Alert severity="error" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  const showSuccess = () => (
    <>
      <Alert severity="success" style={{ display: success ? "" : "none" }}>
        success
      </Alert>
    </>
  );

  const addTaskForm = () => (
    <form className="signinForm">
      <div className="signinItem">
        <label>Name</label>
        <input
          type="text"
          placeholder="name.."
          value={name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="signinItem">
        <label>Description</label>
        <textarea
          placeholder="desctiption.."
          value={desc}
          onChange={handleChange("desc")}
        />
      </div>
      <div className="signinItem">
        <label>status</label>
        <select
          onChange={handleChange("status")}
          name="status"
          id="status"
          value={status}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="signinItem">
        <label>priority</label>
        <textarea
          placeholder="priority.."
          value={priority}
          onChange={handleChange("priority")}
        />
      </div>

      <button onClick={clickSubmit}>Add</button>
    </form>
  );
  return (
    <Dialog open={true} fullWidth maxWidth="lg">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <DialogTitle>
          <>Add Task</>
        </DialogTitle>
        <Link to="/dashboard/project">
          <IconButton aria-label="close">
            <CloseIcon />
          </IconButton>
        </Link>
      </div>

      <DialogContent dividers>
        <div>
          {showSuccess()}
          {showError()}
          {addTaskForm()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
