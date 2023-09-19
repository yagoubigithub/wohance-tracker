const initState = {
    error : null,
   
    projects : [
      
    ]

  }
  
   const projectReducer = (state = initState, action) =>{
  
      switch (action.type) {
    
       case "GET_PROJECTS" : 
       return {...state, projects : action.payload}

       case "ADD_TIME":
        return {...state, activeWins : [] ,times : [...action.payload]}

    case "RECORD_ACTIVE_WIN" : 
    return {...state,activeWins : action.payload}

    case "SET_ACTIVE_TIMER" : 
    return {
        ...state, active : action.payload
    }
          default:
              return state;
            
      }
  }
  
  export default projectReducer;