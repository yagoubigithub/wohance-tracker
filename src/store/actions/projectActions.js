
import { API } from "../../Config";

const { ipcRenderer } = window.require("electron");


export const getProjects  = (employee, token) =>  async (dispatch, getState) => {


fetch(`${API}/projects/${employee.userId}/${employee._id}`, {
method: "GET",
headers: {
Accept: "application/json",
"Content-Type": "application/json",
Authorization: `Bearer ${token}`,
},
})
.then((responce) => {
return responce.json();
})

.then((data) => {
if (data.error) {
  dispatch({
    type: "PROJECT_ERROR",
    payload: data.error,
  });
  return;
}

dispatch({
      type : "GET_PROJECTS",
      payload : data})
})
.catch((err) => {
console.log(err);
});

}


//setTaskTime


export const setTaskTime = (time, clockIn, clockOut , employeeId, taskId ,token) => async(dispatch, getState) => {
  const activeWins = [...getState().timer.activeWins];

  fetch(`${API}/times/${employeeId}/${taskId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body : JSON.stringify({activeWins : JSON.stringify(activeWins) ,time : JSON.stringify(time) , clockIn , clockOut , employeeId , taskId})
  })
    .then((responce) => {
      return responce.json();
    })

    .then((data) => {
      if (data.error) {
        dispatch({
          type: "TIME_ERROR",
          payload: data.error,
        });
        return;
      }

      dispatch({
          type: "ADD_TIME",
          payload: data,
        }); 
    })
    .catch((err) => {
      console.log(err);
    });

}

export const startRecordActiveWin = (employeeId, taskId , token) => async(dispatch, getState) => {
  const activeWins = [...getState().timer.activeWins];
  const timeIndex = getState().timer.times.length

  ipcRenderer.send("start-get-active-win");
  ipcRenderer.on("current-win", (event, value) => {
    if (activeWins[activeWins.length - 1]) {
      if (activeWins[activeWins.length - 1].title === value.title) {
        activeWins[activeWins.length - 1].timeSpent += 1;
      } else {
        value.timeSpent = 1;
        value.timeIndex = timeIndex
        activeWins.push(value);
      }
    } else {
      value.timeSpent = 1;
      value.timeIndex = timeIndex
      activeWins.push(value);
    }
  

    dispatch({
      type: "RECORD_ACTIVE_WIN",
      payload: [...activeWins],
    });
  });

  ipcRenderer.on("screenshot", (event, value) => {

    fetch(`${API}/screenshot/${employeeId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body : JSON.stringify({...value, taskId})
    })
      .then((responce) => {
        return responce.json();
      })
  
     
      .catch((err) => {
        console.log(err);
      });
  })
};
export const stopRecordActiveWin = () => async (dispatch, getState) => {
  ipcRenderer.send("stop-get-active-win");
};




export const getTask = (taskId, token)  => {
return   fetch(`${API}/tasks/task/${taskId}`, {
    method: "GET",
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    },
    })
    .then((responce) => {
    return responce.json();
    })
    
  
    .catch((err) => {
    console.log(err);
    });

}

