const mongoose = require("mongoose");

const subTaskSchema = mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  allDay: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
  },
  startdate: {
    type: String,
  },
  enddate: {
    type: String,
  },
  description: {
    type: String,
  },
  subTasks: [
    {
      title: {
        type: String,
      },
      date: {
        type: String,
      },
      time: {
        type: String,
      },
      allDay: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
      },
      startdate: {
        type: String,
      },
      enddate: {
        type: String,
      },
      description: {
        type: String,
      },
    }
  ],
},{
  timestamps: true,
});

const taskListSchema = mongoose.Schema(
  {   
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    taskname: {
      type: String,
      required: false,
    },
    subTask: [subTaskSchema],
  },
  {
    timestamps: true,
  },
  {
    collection: "taskList",
  }
);

module.exports = mongoose.model("taskList", taskListSchema);