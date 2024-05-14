const router = require("express").Router();
const { userAuth } = require("../middleware/auth");


const taskListController = require('../controller/taskList');

router.post('/taskList/create', userAuth, taskListController.addTaskList);
router.get('/taskList', userAuth, taskListController.viewTaskList);
router.put('/taskList/:taskId', userAuth, taskListController.updateTaskList);
router.delete('/taskList/:taskId', userAuth, taskListController.deleteTaskList);
router.get('/taskList/filter', userAuth, taskListController.filterTaskList);
router.get("/subtasks", userAuth, taskListController.getAllSubTasks);
router.get("/subtasks/filter", userAuth, taskListController.filterTasks);

router.get("/search", userAuth, taskListController.searchTasks);


router.post('/taskList/:taskId/subTask', userAuth,taskListController.addSubTask);
router.get('/taskList/:taskId/subTask/:subTaskId', userAuth, taskListController.viewSubTask);
router.put('/taskList/:taskId/subTask/:subTaskId', userAuth, taskListController.updateSubTask);
router.delete('/taskList/:taskId/subTask/:subTaskId', userAuth, taskListController.deleteSubTask);

router.post('/:taskListId/subtasks/:subTaskId', userAuth, taskListController.addSubTaskWithinTask);
router.get('/:taskListId/subtasks/:subTaskId/subtasks/:subTaskWithinId', userAuth, taskListController.viewSubTaskWithinTask);
router.put('/:taskListId/subtasks/:subTaskId/subtasks/:subTaskWithinId', userAuth, taskListController.updateSubTaskWithinTask);
router.delete('/:taskListId/subtasks/:subTaskId/subtasks/:subTaskWithinId', userAuth, taskListController.deleteSubTaskWithinTask);

router.get('/getGroupedTaskList', userAuth,taskListController.getGroupedTaskList);
router.get('/taskList/name', userAuth,taskListController.getTaskNames);

router.post('/add', userAuth, taskListController.addtoStared);
router.get('/viewStaredTsaky', userAuth, taskListController.viewStaredTsaky);

module.exports = router 