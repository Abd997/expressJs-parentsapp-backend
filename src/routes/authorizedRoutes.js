const route = require("express").Router();
const userTasks = require("../controllers/user-tasks");
const subTasks = require("../controllers/sub-tasks");
const postMessage = require("../controllers/postMessage");
const getMessage = require("../controllers/getMessage");
const getUserDetails = require("../controllers/getUserDetails");
const update_user = require("../controllers/update-user");

route.get("/details", getUserDetails);

// ============ USER UPDATE ============
route.put("/user-age", update_user.updateAge);
route.put("/child-birth", update_user.updateChildBirth);
route.put("/pregnancy-stage", update_user.updatePregnacyStage);
route.put("/username", update_user.updateUsername);
route.put("/email", update_user.updateEmail);

// ============ CHAT ============
route.post("/message", postMessage);
route.get("/message", getMessage);

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
