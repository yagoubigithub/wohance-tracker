import React from "react";
import { formatTime } from "../../utils";

const TimeTable = ({ data }) => {
  return (
    <div>
      <div style={{ maxHeight: 400 , height : 400, overflow: "auto" ,  boxShadow : "1px 1px 5px gray"  , margin : 8}}>
        <table style={{width : "100%" , textAlign : "center"}}>
          <thead>
            <tr>
              <th>image</th>
              <th>App Name</th>

              <th>Project</th>
              <th>Task</th>
              <th>Employee</th>
              <th>Time Spent</th>
            </tr>
          </thead>

          <tbody>
            {data.map((d) => {
              return (
                <tr>
                  <td>
                    <img
                      src={"data:image/png;base64, " + d.image}
                      alt="image"
                    />
                  </td>

                  <td>{d.nameapp}</td>
                  <td>{d.projectname}</td>
                  <td>{d.taskname}</td>
                  <td>{d.employeename}</td>
                  <td>   {formatTime(d.time.hours)}:{formatTime(d.time.minutes)}:{formatTime(d.time.seconds)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
