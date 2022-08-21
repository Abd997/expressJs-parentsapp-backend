const { connectedClient } = require("../utils/database");

const TaskRepo = {
	addTask: async function (task, parentEmail) {
		const res = await connectedClient.query(`
      INSERT INTO tasks (
        name, 
        description, 
        start_date, 
        end_date,
        parent_email
      )
      VALUES (
        '${task.name}',
        '${task.description}',
        '${task.start_date}',
        '${task.end_date}',
        '${parentEmail}'
      )
    `);
		return res.rows;
	},
	getAllTasks: async function (parentEmail) {
		const res = await connectedClient.query(`
      SELECT * FROM tasks
      WHERE parent_email = '${parentEmail}'
    `);
		return res.rows;
	},
	updateTaskStatus: async function (taskId, taskStatus) {
		const res = await connectedClient.query(`
      UPDATE tasks SET status = '${taskStatus}' WHERE id = ${taskId}
    ;`);
		return res.rows;
	},
	updateTaskType: async function (taskId, taskType) {
		const res = await connectedClient.query(`
      UPDATE tasks SET type = '${taskType}' WHERE id = ${taskId}
    ;`);
		return res.rows;
	},
	findTaskById: async function (taskId) {
		const res = await connectedClient.query(`
      SELECT * FROM tasks
      WHERE id = ${taskId}
    ;`);
		if (res.rowCount == 0) {
			return null;
		}
		return res.rows;
	}
};

module.exports = TaskRepo;
