const taskListService = require("../services/taskList");

exports.addTaskList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { taskname } = req.body;

    const savedTaskList = await taskListService.addTaskList(taskname, userId);

    res.status(201).json(savedTaskList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.viewTaskList = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskList = await taskListService.getTaskList(userId);
    res.status(200).json(taskList);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateTaskList = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    const updateData = req.body;

    const updatedTaskList = await taskListService.updateTaskList(userId, taskId, updateData);

    res.status(200).json(updatedTaskList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTaskList = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.taskId;

    const deletedTask = await taskListService.deleteTaskList(userId, taskId);

    res.status(200).json(deletedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.filterTaskList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, startTime, endTime } = req.query;

    const filteredTasks = await taskListService.filterTasks(userId, startDate, endDate, startTime, endTime);

    res.status(200).json(filteredTasks);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllSubTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const subTasks = await taskListService.getAllSubTasks(userId);
    res.status(200).json({ subTasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { filterType, customStartDate, customEndDate } = req.query;

    const filteredTasks = await taskListService.filtersubTaskTasks(userId, filterType, customStartDate, customEndDate);
    res.status(200).json({ filteredTasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { query } = req.query;

    const results = await taskListService.freeTextSearch(userId, query);
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSubTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const subTask = req.body;

    const updatedTaskListItem = await taskListService.addSubtask(
      taskId,
      subTask
    );

    res.status(200).json(updatedTaskListItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.viewSubTask = async (req, res) => {
    try {
      const { taskId, subTaskId } = req.params;
  
      const subTask = await taskListService.viewSubtask(taskId, subTaskId);
  
      res.status(200).json(subTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

exports.updateSubTask = async (req, res) => {
    try {
      const { taskId, subTaskId } = req.params;
      const updatedSubTask = req.body;
  
      const updatedTaskListItem = await taskListService.updateSubtask(
        taskId,
        subTaskId,
        updatedSubTask
      );
  
      res.status(200).json(updatedTaskListItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

exports.deleteSubTask = async (req, res) => {
    try {
      const { taskId, subTaskId } = req.params;
  
      const updatedTaskListItem = await taskListService.deleteSubtask(
        taskId,
        subTaskId
      );
  
      res.status(200).json(updatedTaskListItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};
  
exports.getTaskNames = async (req, res) => {
  try {
    const userId = req.user.id;

    const getAllTaskName = await taskListService.getTaskNames(userId);
    res.json(getAllTaskName);
  } catch (err) {
    console.error("Error fetching task names:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addSubTaskWithinTask = async (req, res) => {
    const { taskListId, subTaskId } = req.params;
    const subTaskData = req.body;
    try {
        const taskList = await taskListService.addSubTaskWithinTask(taskListId, subTaskId, subTaskData);
        res.json(taskList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.viewSubTaskWithinTask = async (req, res) => {
    const { taskListId, subTaskId, subTaskWithinId } = req.params;
    try {
        const taskList = await taskListService.viewSubTaskWithinTask(taskListId, subTaskId, subTaskWithinId);
        res.json(taskList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSubTaskWithinTask = async (req, res) => {
    const { taskListId, subTaskId, subTaskWithinId } = req.params;
    const subTaskData = req.body;
    try {
        const taskList = await taskListService.updateSubTaskWithinTask(taskListId, subTaskId, subTaskWithinId, subTaskData);
        res.json(taskList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSubTaskWithinTask = async (req, res) => {
    const { taskListId, subTaskId, subTaskWithinId } = req.params;
    try {
        const taskList = await taskListService.deleteSubTaskWithinTask(taskListId, subTaskId, subTaskWithinId);
        res.json(taskList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addtoStared = async (req,res) => {
    const { taskListId } = req.body;
    const userId = req.user.id;
    try {
        const taskList = await taskListService.addSubTaskWithinTask(taskListId, userId);
        res.json(taskList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.viewStaredTsaky = async (req,res) => {
    const userId = req.user.id;
    try {
        const taskList = await taskListService.viewStaredTsaky(userId);
        res.json(taskList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getGroupedTaskList = async (req,res) => {
    const userId = req.user.id;
    try {
        const groupedTasks = await taskListService.getGroupedTaskList(userId);
        res.json(groupedTasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

