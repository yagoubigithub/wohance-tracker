const initState = {
    error : null,
   
    projects : [
      
    ],
    tasks : []

  }
  
   const projectReducer = (state = initState, action) =>{
  
      switch (action.type) {
    
       case "GET_PROJECTS" : 
       return {...state, projects : action.payload}
       case "GET_TASKS" : 
       return {...state, tasks : action.payload}

       case "SET_TASK_STATUS" : 
       return {...state, tasks : state.tasks.map((task) => {
           if(task._id === action.payload._id){
               task = action.payload
           }
           return task;
       })}

       case "SET_EMPLOYEES_IN_PROJECT" :
         
           return {...state , projects : state.projects.map((project) => {
           if(project._id === action.payload._id){
               project = action.payload
           }
           return project;
       })}

      
          default:
              return state;
            
      }
  }
  
  export default projectReducer;