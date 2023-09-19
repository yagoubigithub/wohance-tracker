import { Grid, Button, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

import { useStopwatch } from "react-timer-hook";
import { useDispatch } from "react-redux";

import {addTimer, getTimers, setActiveTimer, startRecordActiveWin , stopRecordActiveWin } from "../../store/actions/TimerActions"
import { formatTime } from "../../utils";
import { isAuthenticated } from "../../auth";

const MyButton = withStyles((theme) => ({
  root: {
    color: "white",
    textTransform: "none",
    backgroundColor: (props) =>
      props.starttimer !== "true" ? green[500] : red[500],
    width: 200,
    height: 40,
    "&:hover": {
      backgroundColor: (props) =>
        props.starttimer !== "true" ? green[700] : red[700],
    },
  },
}))(Button);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
const space = () => <Grid item xs={2} />;


const Attendence = () => {
  const {employee ,token}  = isAuthenticated()
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  const [startTimer, setStartTimer] = useState(false);
  const [clockIn, setClockIn] = useState("");

  const dispatch  =useDispatch()
  

 
  useEffect(()=>{
    dispatch(getTimers(employee._id, token))
  },[])
  useEffect(() => {
    console.log(startTimer);
  }, [startTimer]);
  return (
    <Paper>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        style={{ paddingTop: "2rem" }}
        alignItems="center"
      >
        {space()}
        <Grid item xs={4}>
          {isRunning ? (
            <p className="text-gray">
              <b>Started at :{clockIn}</b>
            </p>
          ) : (
            <p className="text-gray">Not statrted yet</p>
          )}
        </Grid>

        <Grid item xs={4}>
          <p className="text-gray">{new Date().toISOString().split("T")[0]}</p>
        </Grid>

        {space()}

        {space()}
        <Grid item xs={8}>
          <h1 style={{ textAlign: "center" }}>
            {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
          </h1>
        </Grid>

        {space()}
        <Grid item xs={8} style={{ textAlign: "center" }}>
          <MyButton
            starttimer={`${startTimer}`}
            size="large"
            variant="contained"
            onClick={() => {
              if (!startTimer) {
                const d = new Date();
                const n = d.toLocaleTimeString().split(":");

                setClockIn(n[0] + ":" + n[1]);
              
                dispatch(setActiveTimer(true))
                start();
              } else {
                const d = new Date();
                const n = d.toLocaleTimeString().split(":");

                
               dispatch(addTimer({hours , minutes , seconds} , clockIn ,   n[0] + ":" + n[1] , employee._id ,  token))
              
               dispatch(setActiveTimer(false))
                reset(null, false);
              }
              setStartTimer(!startTimer);
            }}
          >
            {!startTimer ? <span>Clock In</span> : <span> Clock out</span>}
          </MyButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Attendence;
