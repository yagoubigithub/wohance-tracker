import { API } from "../../Config";

export const getEmployees = (userId, token) => async (dispatch, getState) => {
  fetch(`${API}/employees/${userId}`, {
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
          type: "EMPLOYEE_ERROR",
          payload: data.error,
        });
        return;
      }

      dispatch({
        type: "GET_EMPLOYEES",
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};



export const getEmployee= (employeeId, token) => {
 return   fetch(`${API}/employees/employee/${employeeId}`, {
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
};

export const addEmployee = (userId, token, employee) => {
  return fetch(`${API}/employees/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(employee),
  })
    .then((responce) => {
      return responce.json();
    })

    .catch((err) => {
      console.log(err);
    });
};
