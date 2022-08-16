const { connectedClient } = require("../utils/database");

const SubTaskRepo = {
	addSubTask: async function (subTaskName, taskId) {
		const res = await connectedClient.query(`
      INSERT INTO sub_tasks (
        name, 
        fk_task
      )
      VALUES (
        '${subTaskName}',
        '${taskId}'
      )
    `);
		return res.rows;
	},
	getAllSubTasks: async function (taskId) {
		const res = await connectedClient.query(`
      SELECT * FROM sub_tasks
      WHERE fk_task = '${taskId}'
    `);
		return res.rows;
	},
	updateSubTaskStatus: async function (subTaskId, subTaskStatus) {
		const res = await connectedClient.query(`
      UPDATE sub_tasks SET status = '${subTaskStatus}' WHERE id = ${subTaskId}
    ;`);
		return res.rows;
	},
	findSubTaskById: async function (subTaskId) {
		const res = await connectedClient.query(`
      SELECT * FROM sub_tasks
      WHERE id = ${subTaskId}
    ;`);
		if (res.rowCount == 0) {
			return null;
		}
		return res.rows;
	},
	deleteSubTask: async function (subTaskId) {
		const res = await connectedClient.query(`
      DELETE FROM sub_tasks
      WHERE id = ${subTaskId}
    ;`);
		return res.rows;
	},
	getSubTasksFromTaskId: async function (taskId) {
		const res = await connectedClient.query(`
      SELECT * FROM sub_tasks
      WHERE fk_task = ${taskId}
    ;`);
		return res.rows;
	}
};

module.exports = SubTaskRepo;
