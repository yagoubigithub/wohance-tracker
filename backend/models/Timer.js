const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const TimerSchema = new mongoose.Schema(
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
    employeeId: { type: ObjectId, ref: "Employee" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timer", TimerSchema);
