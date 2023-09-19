import React from 'react'

const ScreenShotTable = ({data}) => {
  return (
    <div style={{display :  "flex" , justifyContent : "space-around" , flexWrap :  "wrap" , width :  "100%"}}>{
        
        
     data.map(image=>{
         return(

           <div style={{marginBottom : 15 ,   border : "1px solid black"}}>

           <div style={{width :  400 , height :300 , background : `url(${image.image})` , backgroundSize : "cover" }}>
             
             </div>
            
             task : {image.taskId.name}
             <br />
             Employee : {image.employeeId.name}
             <br />
           </div>
         )
     })   
    }</div>
  )
}

export default ScreenShotTable