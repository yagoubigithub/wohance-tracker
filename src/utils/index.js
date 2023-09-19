


import { API } from "../Config";
const { ipcRenderer } = window.require("electron");
const  fs = window.require("fs");





export const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };
  


  export const getEventMainProcess = async (employeeId ,token)=>{

    ipcRenderer.on("upload_icon", async (event, value) => {

      console.log('upload_icon')
      const image = fs.readFileSync(value.path, 'base64');
    
      fetch(`${API}/upload_icon/${employeeId}`, {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body : JSON.stringify({image , name : value.name , type : "icon"})
        })
        .then((responce) => {
        return responce.json();
        })
        
      
        .catch((err) => {
        console.log(err);
        });
      
     
     
     

    })
  }


  export const calcultTime = (timeOut , timeIn) =>{
    const timeInSec = timeIn.seconds +  timeIn.minutes * 60 + timeIn.hours * 60 *60
    const timeOutSec = timeOut.seconds +  timeOut.minutes * 60 + timeOut.hours * 60 *60

  
  
    const timeArray = [3600, 60]
    .reduceRight(
      (p, b) => r => [Math.floor(r / b)].concat(p(r % b)),
      r => [r]
    )(timeOutSec - timeInSec)
    .map(a => a)

    console.log(timeArray)

    return {seconds : timeArray[2] ,  minutes : timeArray[1] ,  hours : timeArray[0]}
  }