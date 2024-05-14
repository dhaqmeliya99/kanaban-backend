const TaskList = require("../models/taskList");
const Stared = require("../models/stared");

const addTaskList = async function (taskname, userId) {
  {
    try {
      const newTaskList = new TaskList({
        taskname,
        userId
      });
      const savedTaskList = await newTaskList.save();
      return savedTaskList;
    } catch (err) {
      throw new Error(err.message);
    }
  }
};

const getTaskList = async function (userId) {
    try {
      const taskList = await TaskList.find({ userId });
      return taskList;
    } catch (err) {
      throw new Error(err.message);
    }
};

const updateTaskList = async function (userId, taskId, updateData) {
    try {
      const updatedTaskList = await TaskList.findOneAndUpdate(
        { userId, "subTask._id": taskId },
        { $set: { "subTask.$": updateData } },
        { new: true }
      );
      return updatedTaskList;
    } catch (err) {
      throw new Error(err.message);
    }
};

const deleteTaskList = async function (userId, taskId) {
    try {
      const deletedTask = await TaskList.findOneAndUpdate(
        { userId },
        { $pull: { subTask: { _id: taskId } } },
        { new: true }
      );
      return deletedTask;
    } catch (err) {
      throw new Error(err.message);
    }
};

const filterTasks = async function (userId, startDate, endDate, startTime, endTime) {
    try {
      let filter = { userId };
      if (startDate) {
        filter["createdAt"] = { $gte: new Date(startDate) };
      }
      if (endDate) {
        filter["createdAt"] = { ...filter["createdAt"], $lte: new Date(endDate) };
      }
      if (startTime) {
        filter["createdAt"] = { ...filter["createdAt"], $gte: new Date(startTime) };
      }
      if (endTime) {
        filter["createdAt"] = { ...filter["createdAt"], $lte: new Date(endTime) };
      }
  
      const filteredTasks = await TaskList.find(filter);
  
      return filteredTasks;
    } catch (err) {
      throw new Error(err.message);
    }
};

const getAllSubTasks = async (userId) => {
    try {
      const taskList = await TaskList.findOne({ userId }).populate("subTask.subTasks");
      if (!taskList) {
        throw new Error("Task list not found");
      }
      return taskList.subTask[0];
    } catch (error) {
      throw new Error(error.message);
    }
};

const filtersubTaskTasks = async (userId, filterType, customStartDate, customEndDate) => {
    try {
      let filter = { userId };
      let currentDate = new Date();
  
      switch (filterType) {
        case "Today":
          filter["subTask.date"] = currentDate.toISOString().split('T')[0];
          break;
        case "Tomorrow":
          currentDate.setDate(currentDate.getDate() + 1);
          filter["subTask.date"] = currentDate.toISOString().split('T')[0];
          break;
        case "This Week":
          let endOfWeek = new Date(currentDate.getTime() + (7 - currentDate.getDay()) * 86400000);
          filter["subTask.date"] = { $gte: currentDate.toISOString().split('T')[0], $lte: endOfWeek.toISOString().split('T')[0] };
          break;
        case "Next Week":
          let startOfNextWeek = new Date(currentDate.getTime() + (8 - currentDate.getDay()) * 86400000);
          let endOfNextWeek = new Date(startOfNextWeek.getTime() + 6 * 86400000);
          filter["subTask.date"] = { $gte: startOfNextWeek.toISOString().split('T')[0], $lte: endOfNextWeek.toISOString().split('T')[0] };
          break;
        case "Month":
          let startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          let endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          filter["subTask.date"] = { $gte: startOfMonth.toISOString().split('T')[0], $lte: endOfMonth.toISOString().split('T')[0] };
          break;
        case "Custom":
          if (customStartDate && customEndDate) {
            filter["subTask.date"] = { $gte: new Date(customStartDate).toISOString().split('T')[0], $lte: new Date(customEndDate).toISOString().split('T')[0] };
          } else {
            throw new Error("Custom date range not provided");
          }
          break;
        default:
          throw new Error("Invalid filter type");
      }
  
      const filteredTasks = await TaskList.find(filter);
      return filteredTasks;
    } catch (error) {
      throw new Error(error.message);
    }
};

const addSubtask = async function (taskId, subTask) {
    try {
        const taskListItem = await TaskList.findById(taskId);

        if (!taskListItem) {
            throw new Error("Task list item not found");
        }

        taskListItem.subTask.push(subTask);

        const updatedTaskListItem = await taskListItem.save();

        return updatedTaskListItem;
    } catch (err) {
        throw new Error(err.message);
    }
};

const viewSubtask = async function (taskId, subTaskId) {
  try {
      const taskListItem = await TaskList.findById(taskId);

      if (!taskListItem) {
          throw new Error("Task list item not found");
      }

      const subTask = taskListItem.subTask.id(subTaskId);

      if (!subTask) {
          throw new Error("Subtask not found");
      }

      return subTask;
  } catch (err) {
      throw new Error(err.message);
  }
};

const updateSubtask = async function (taskId, subTaskId, updatedSubTask) {
  try {
      const taskListItem = await TaskList.findById(taskId);

      if (!taskListItem) {
          throw new Error("Task list item not found");
      }

      const subTask = taskListItem.subTask.id(subTaskId);

      if (!subTask) {
          throw new Error("Subtask not found");
      }

      Object.assign(subTask, updatedSubTask);

      const updatedTaskListItem = await taskListItem.save();

      return updatedTaskListItem;
  } catch (err) {
      throw new Error(err.message);
  }
};

const deleteSubtask = async function (taskId, subTaskId) {
  try {
      const taskListItem = await TaskList.findById(taskId);

      if (!taskListItem) {
          throw new Error("Task list item not found");
      }

      taskListItem.subTask.id(subTaskId).remove();

      const updatedTaskListItem = await taskListItem.save();

      return updatedTaskListItem;
  } catch (err) {
      throw new Error(err.message);
  }
};

const getTaskNames = async function (userId) {
  try {
    const taskNames = await TaskList.find({ userId: userId }, 'taskname');
    return taskNames;
  } catch (error) {
    console.error('Error fetching task names:', error);
    throw new Error('Error fetching task names');
  }
};

const addSubTaskWithinTask = async function (taskListId, subTaskId, subTaskData) {
  try {
      const taskList = await TaskList.findById(taskListId);
      if (!taskList) {
          throw new Error('Task list not found');
      }
      const subTaskIndex = taskList.subTask.findIndex(subTask => subTask._id == subTaskId);
      if (subTaskIndex === -1) {
          throw new Error('Subtask not found');
      }
      taskList.subTask[subTaskIndex].subTasks.push(subTaskData);
      await taskList.save();
      return taskList;
  } catch (error) {
      throw new Error('Could not add subtask within task list');
  }
};

const viewSubTaskWithinTask = async function (taskListId, subTaskId, subTaskWithinId) {
  try {
      const taskList = await TaskList.findById(taskListId);
      if (!taskList) {
          throw new Error('Task list not found');
      }
      const subTask = taskList.subTask.find(subTask => subTask._id == subTaskId);
      if (!subTask) {
          throw new Error('Subtask not found');
      }
      const subTaskWithin = subTask.subTasks.find(subTaskWithin => subTaskWithin._id == subTaskWithinId);
      if (!subTaskWithin) {
          throw new Error('Subtask within not found');
      }
      return subTaskWithin;
  } catch (error) {
      throw new Error('Could not view subtask within task list');
  }
};

const updateSubTaskWithinTask = async function (taskListId, subTaskId, subTaskWithinId, subTaskData) {
  try {
      const taskList = await TaskList.findById(taskListId);
      if (!taskList) {
          throw new Error('Task list not found');
      }
      const subTask = taskList.subTask.find(subTask => subTask._id == subTaskId);
      if (!subTask) {
          throw new Error('Subtask not found');
      }
      const subTaskWithin = subTask.subTasks.find(subTaskWithin => subTaskWithin._id == subTaskWithinId);
      if (!subTaskWithin) {
          throw new Error('Subtask within not found');
      }
      Object.assign(subTaskWithin, subTaskData);
      await taskList.save();
      return taskList;
  } catch (error) {
      throw new Error('Could not update subtask within task list');
  }
};

const deleteSubTaskWithinTask = async function (taskListId, subTaskId, subTaskWithinId) {
  try {
      const taskList = await TaskList.findById(taskListId);
      if (!taskList) {
          throw new Error('Task list not found');
      }
      const subTask = taskList.subTask.find(subTask => subTask._id == subTaskId);
      if (!subTask) {
          throw new Error('Subtask not found');
      }
      const subTaskIndex = subTask.subTasks.findIndex(subTaskWithin => subTaskWithin._id == subTaskWithinId);
      if (subTaskIndex === -1) {
          throw new Error('Subtask within not found');
      }
      subTask.subTasks.splice(subTaskIndex, 1);
      await taskList.save();
      return taskList;
  } catch (error) {
      throw new Error('Could not delete subtask within task list');
  }
};

const addtoStared = async function (taskListId, userId){
  try {
      const existingFavorite = await Stared.findOne({ taskListId, userId, stared: 1 });

      if (existingFavorite) {
          await Stared.findByIdAndUpdate(existingFavorite._id, { $set: { stared: 0 } });
          await TaskList.findByIdAndUpdate(taskListId, { $set: { stared: 0 } });
          return res.status(200).json({ message: 'Removed from Stared' });
      } else {
          const existingZeroFavorite = await Stared.findOne({ taskListId, userId, stared: 0 });

          if (existingZeroFavorite) {
              await Stared.findByIdAndUpdate(existingZeroFavorite._id, { $set: { stared: 1 } });
              await TaskList.findByIdAndUpdate(taskListId, { $set: { stared: 1 } });
              return res.status(201).json({ message: 'Added to Stared' });
          } else {
              const newFavorite = new Stared({ taskListId, userId, stared: 1 });
              await newFavorite.save();
              await TaskList.findByIdAndUpdate(taskListId, { $set: { stared: 1 } });
              return res.status(201).json({ message: 'Added to Stared' });
          }
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};

const viewStaredTsaky = async function (userId) {
  try {
      const stared = await Stared.find({ userId }).populate('taskListId');

      return stared
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
}

const getGroupedTaskList = async (userId) => {
    try {
      const pipeline = [
        { $match: { userId: userId } },
        { $unwind: "$subTask" },
        { $group: { _id: "$subTask.title", tasks: { $push: "$subTask" } } },
        { $project: { _id: 0, taskname: "$_id", tasks: 1 } },
      ];
  
      const groupedTasks = await TaskList.aggregate(pipeline);
  
      return groupedTasks
    } catch (error) {
      console.error("Error fetching grouped task list:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};

const freeTextSearch = async (userId, query) => {
    try {
      const results = await TaskList.find(
        { userId, $text: { $search: query } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });
  
      return results;
    } catch (error) {
      throw new Error(error.message);
    }
};

 
module.exports = {
  freeTextSearch,
  addTaskList,
  viewSubtask,
  getTaskNames,
  updateSubtask,
  addSubTaskWithinTask,
  viewSubTaskWithinTask,
  updateSubTaskWithinTask,
  deleteSubtask,
  deleteSubTaskWithinTask,
  filtersubTaskTasks,
  addSubtask,
  addtoStared,
  getGroupedTaskList,
  getAllSubTasks,
  viewStaredTsaky,
  getTaskList,
  updateTaskList,
  deleteTaskList,
  filterTasks
};
