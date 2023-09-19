
const os  = window.require("os")

export const setEmployee  = (data) =>  async (dispatch, getState) => {

   dispatch({
     type : "SET_EMPLOYEE",
     payload : data
   })

    
}

export const getComputerInfo  = () =>  async (dispatch, getState) => {


  const computerName = os.hostname()
  let platform = "windows"
  switch (process.platform) {
    case "darwin":
      platform = "mac"
      break;

      case "win32":
        platform = "windows"
        break;
  
        case "linux":
          platform = "linux"
          break;
    

    default:
      platform = "windows"
      break;
  }

  dispatch({
    type : "SET_COMPUTER_INFO",
    payload : {
      platform,
      computerName
    }

  })
 
}