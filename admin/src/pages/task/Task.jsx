import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { getTask , getScreenShots } from "../../store/actions/projectActions";

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import AppTable from "./AppTable";
import ScreenShotTable from "./ScreenShotTable";

const Task = () => {
  const [task, setTask] = useState({});
  const { taskId } = useParams();
  const { token } = isAuthenticated();
  const [apps, setApps] = useState([]);
  const [screenshots, setScreenShots] = useState([]);
  useEffect(() => {
    getTask(taskId, token).then((data) => {
      if (data.error) {
      } else {
        const _apps = [];
        setTask(data);

        data.times.map((time, index) => {
          JSON.parse(time.activeWins).map((active) => {
            const nameapp = active.name;
            const image =  time.employeeId.images.length > 0 ? time.employeeId.images.filter(
              (image) => image.name === nameapp
            )[0].image : "";

            const _time = JSON.parse(time.time);

            const obj = {
              id: time._id,
              nameapp,
              image,
              taskname: data.name,
              projectname: data.projectId.name,
              employeename: time.employeeId.name,
              time: _time,
            };

            _apps.push(obj);
          });
        });
       
        let helper = [];
        _apps.map((app) => {
          const indexH = helper.findIndex(
            (h) =>
              app.nameapp === h.nameapp &&
              app.taskname === h.taskname &&
              app.projectname === h.projectname &&
              app.employeename === h.employeename
          )
          console.log(indexH)
          if (indexH > -1) {
            const apptime =
              app.time.seconds +
              app.time.minutes * 60 +
              app.time.hours * 60 * 60;
            const timeArray = [3600, 60]
              .reduceRight(
                (p, b) => (r) => [Math.floor(r / b)].concat(p(r % b)),
                (r) => [r]
              )(
                helper[indexH].time.seconds +
                  helper[indexH].time.minutes * 60 +
                  helper[indexH].time.hours * 60 * 60 +
                  apptime
              )
              .map((a) => a);

            helper[indexH].time = {
              seconds: timeArray[2],
              minutes: timeArray[1],
              hours: timeArray[0],
            };
          } else {
            helper.push(app);
          }
        });
        setApps(helper);
      }
    });

    getScreenShots(taskId, token).then(data=>{

      if (data.error) {
      } else {


        console.log(data)

        setScreenShots(data)
      }

    })
  }, []);
  return (
    <div style={{ flex: 4 }}>

    
      <h2>Task : {task.name}     <button>Edit </button></h2>
   

      <h3>Active Apps</h3>

      <AppTable data={apps} />

<h3>ScreenShots</h3>
      <ScreenShotTable  data={screenshots} />
      
    </div>
  );
};

export default Task;
