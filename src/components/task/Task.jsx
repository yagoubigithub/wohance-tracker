import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link , useParams } from 'react-router-dom';
import { isAuthenticated } from '../../auth';
import { getTask } from '../../store/actions/projectActions';
import { formatTime } from '../../utils';

const Task = () => {
  const [task, setTask] = useState({});
  const [time, setTime] = useState({seconds : 0 ,hours : 0 , minutes : 0});
  const {projectIndex , taskId} = useParams()
  const { token } = isAuthenticated();
  useEffect(()=>{
    getTask(taskId, token).then((data) => {
      if (data.error) {
      } else {
       
        setTask(data);
        console.log(data)


    

      }

    })

  
  },[])
  
  useEffect(()=>{
   
    if(task.times){
     
      const time_spent = task.times.reduce((total , current)=>{
  
        const time = JSON.parse(current.time)
  
        total += time.seconds + time.minutes * 60 + time.hours *60 *60
        return total;
      } , 0)
  
      const timeArray = [3600, 60]
      .reduceRight(
        (p, b) => r => [Math.floor(r / b)].concat(p(r % b)),
        r => [r]
      )(time_spent)
      .map(a => a)
  
  
      setTime({seconds : timeArray[2] ,  minutes : timeArray[1] ,  hours : timeArray[0]})
  
    }
  
  },[task])
  return <div>
      <Link to={`/tasks/${projectIndex}`}>
        {"<"} {task.projectId && task.projectId.name}
      </Link>
   <h2> {task.name}</h2>  

   {<span>    {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}</span>}
   <h4> status : {task.status}</h4>

   <h6>
     {task.desc}
   </h6>

  </div>;
};

export default Task;
