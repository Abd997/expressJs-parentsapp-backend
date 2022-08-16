const route = require("express").Router();
const userTasks = require("../controllers/user-tasks");
const subTasks = require("../controllers/sub-tasks");

// route.get("/articles", articles.validateReq, articles.getArticles);

route.post("/update/childbirthdate/");

// ============ USER TASK ============
route.post("/task", userTasks.addUserTask);
route.put("/task-status", userTasks.updateTaskStatus);
route.put("/task-type", userTasks.updateTaskType);
route.get("/tasks", userTasks.getUserTasks);
route.get("/task/:taskId/subtasks", userTasks.getSubTasks);

// ============ USER SUB-TASK ============
route.post("/subtask", subTasks.addSubTask);
route.put("/subtask/status", subTasks.updateStatus);
route.delete("/subtask", subTasks.delSubTask);

module.exports = route;
