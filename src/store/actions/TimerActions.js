
import { API } from "../../Config";
import axios from "axios"

const { ipcRenderer } = window.require("electron");

export const setActiveTimer = (active) => async(dispatch, getState) => {
  dispatch({
    type: "SET_ACTIVE_TIMER",
    payload: active
  });
}

export const addTimer = (time, clockIn, clockOut , employeeId ,token) => async(dispatch, getState) => {
  
    
  fetch(`${API}/times/timer/${employeeId}/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body : JSON.stringify({time : JSON.stringify(time) , clockIn , clockOut  })
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
          type: "ADD_TIMEER",
          payload: data,
        }); 
    })
    .catch((err) => {
      console.log(err);
    });


};

export const startRecordActiveWin = () => async(dispatch, getState) => {
 
};

export const stopRecordActiveWin = () => async (dispatch, getState) => {
  ipcRenderer.send("stop-get-active-win");
};


export const getTimers  = (employeeId, token) =>async (dispatch, getState) => {


  fetch(`${API}/times/timer/${employeeId}/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
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
          type: "GET_TIMEERS",
          payload: data,
        }); 
    })
    .catch((err) => {
      console.log(err);
    });

/*
  axios
      .get("/times/" +employeeId) 
      .then((data) => {
        
        console.log(data.data,data.data.activeWins, data.data.time)
      
        dispatch({
          type : "GET_TIMES",
          payload : data.data.map(data=>{
            const activeWins = JSON.parse(data.activeWins)
            const time = JSON.parse(data.time)
           data.time = time;
           data.activeWins = activeWins
           return data
          })
        });
      })
      .catch((error) => {

        console.log(error)
      });

      */
}