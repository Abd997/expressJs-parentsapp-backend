const { connectedClient } = require("../utils/database");

export const MessageRepo = {
	getMessages: async function () {
		const res = await connectedClient.query(`
      SELECT * FROM messages
      WHERE status = 'unsend'
    ;`);
		if (res.rowCount == 0) {
			return null;
		}
		return res.rows;
  },
  getMessageFromAdmin: async function (userEmail: string) {
    const res = await connectedClient.query(`
      SELECT * FROM messages
      WHERE message_to = '${userEmail}'
    ;`);
    if (res.rowCount == 0) {
			return null;
		}
		return res.rows;
  },
  postMessageToAdmin: async function (message: String, userEmail: String, adminEmail: String) {
    await connectedClient.query(`
      INSERT INTO messages (
        message_text,
        message_from,
        message_to,
        status
      ) VALUES (
        '${message}',
        '${userEmail}',
        '${adminEmail}',
        'unread'
      )
    ;`)
  },
  postMessageToUser: async function (message: String, userEmail: String, adminEmail: String) {
    await connectedClient.query(`
      INSERT INTO messages (
        message_text,
        message_from,
        message_to,
        status
      ) VALUES (
        '${message}',
        '${userEmail}',
        '${adminEmail}',
        'unread'
      )
    ;`)
  },
  getAdminUnreadMessages: async function () {
    const res = await connectedClient.query(`
    SELECT * FROM messages
    WHERE status = 'unread'
  ;`);
  if (res.rowCount == 0) {
    return "no messages";
  }
  return res.rows;
  },
  sendMessageToUser: async function (userEmail: string, adminEmail: string, messageText: string) {
    await connectedClient.query(`
      INSERT INTO messages (
        message_to,
        message_from,
        message_text
      ) VALUES (
        '${userEmail}',
        '${adminEmail}',
        '${messageText}'
      )
    ;`);
  }
};
