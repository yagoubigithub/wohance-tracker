
import { API } from "../../Config";

import axios from "axios"

export const getProjects  = (userId, token) =>  async (dispatch, getState) => {

      fetch(`${API}/projects/${userId}`, {
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


export const addProject  = (userId, token ,project)  => {
  return fetch(`${API}/projects/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body : JSON.stringify(project)
  })
    .then((responce) => {
      return responce.json();
    })

   
    .catch((err) => {
     
      console.log(err);
    });



}
//setTaskTime

export const setTaskTime  = (time) =>  async (dispatch, getState) => {


  const employee = getState().employee
  axios
      .post(`/tasks/${employee.adminId}/${employee.id}` , {
 
     ...time
  
  })
      .then((data) => {
          console.log(data.data)
      
      })
      .catch((error) => {

        console.log(error)
      });


}


export const getTasks  = (projectId, token) =>  async (dispatch, getState) => {

fetch(`${API}/tasks/${projectId}`, {
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
      type : "GET_TASKS",
      payload : data})
})
.catch((err) => {
console.log(err);
});

}

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

export const addTask  = (userId, token ,task)  => {
return fetch(`${API}/tasks/${userId}`, {
method: "POST",
headers: {
Accept: "application/json",
"Content-Type": "application/json",
Authorization: `Bearer ${token}`,
},
body : JSON.stringify(task)
})
.then((responce) => {
return responce.json();
})


.catch((err) => {

console.log(err);
});



}



//updateTaskStatus

export const updateTaskStatus  = (task , status ,  index, token) =>  async (dispatch, getState) => {
  fetch(`${API}/tasks/status/${task._id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body :JSON.stringify({status , index})
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
            type : "SET_TASK_STATUS",
            payload : data})
    })
    .catch((err) => {
      console.log(err);
    });

}


//setEmployeesInProject



export const setEmployeesInProject  = (projectId, employees , token) =>  async (dispatch, getState) => {


   fetch(`${API}/projects/employees/${projectId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body : JSON.stringify({employees})
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
            type : "SET_EMPLOYEES_IN_PROJECT",
            payload : data})
    })
   
    .catch((err) => {
     
      console.log(err);
    });
}
//getScreenShots

export const getScreenShots = (taskId, token)  => {
  return   fetch(`${API}/screenshot/task/${taskId}`, {
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