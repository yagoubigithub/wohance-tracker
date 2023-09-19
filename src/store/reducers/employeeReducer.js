const initState = {
    error : null,
  

  }
  
   const employeeReducer = (state = initState, action) =>{
  
      switch (action.type) {
    
        case  "SET_EMPLOYEE": 
        return {...state, ...action.payload}
       
        case "SET_COMPUTER_INFO" : 
        return {...state,...action.payload}
      
          default:
              return state;
            
      }
  }
  
  export default employeeReducer;