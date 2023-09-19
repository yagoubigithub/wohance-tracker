const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const TimeSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },
    clockIn: {
      type: String,
      required: true,
    },
    clockOut: {
      type: String,
      required: true,
    },
    activeWins: {
      type: String
    },
    employeeId: { type: ObjectId, ref: "Employee" },

    taskId: { type: ObjectId, ref: "Task" , default : null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Time", TimeSchema);
