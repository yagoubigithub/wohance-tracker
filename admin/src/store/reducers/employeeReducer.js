const initState = {
    error : null,
    employees : []
  

  }
  
   const employeeReducer = (state = initState, action) =>{
  
      switch (action.type) {
    
      
        case "EMPLOYEE_ERROR" :
            return {...state,error : action.payload}
          

        case "GET_EMPLOYEES" :
            return {...state,employees : [...action.payload]}
      
          default:
              return state;
            
      }
  }
  
  export default employeeReducer;