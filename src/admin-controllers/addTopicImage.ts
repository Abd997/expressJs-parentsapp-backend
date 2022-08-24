import { Request, Response } from "express";
import TopicRepo from "../repo/TopicRepo";

const BadRequestError = require("../errors/BadRequestError");
const sendErrorResponse = require("../sendErrorResponse");

interface MulterRequest extends Request {
	file: any;
}

export = async (req: MulterRequest, res: Response) => {
	try {
		const mainTopicId = req.body.mainTopicId;
		if (!mainTopicId) {
			throw new BadRequestError("Main topic id not sent");
		}
		const mainTopic = await TopicRepo.findTopicById(mainTopicId);
		if (!mainTopic) {
			throw new BadRequestError("Main topic does not exists");
		}
		await TopicRepo.updateMainTopicImage(
			mainTopicId,
			req.file.filename
		);
		res.json({
			msg: "Image has been uploaded successfully"
		});
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
