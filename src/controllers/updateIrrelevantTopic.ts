import { Request, Response } from "express";
import BadRequestError from "../errors/BadRequestError";
import IrrelevantTopicRepo from "../repo/IrrelevantTopicRepo";
import sendErrorResponse from "../sendErrorResponse";

export = async (req: Request, res: Response) => {
	try {
		const { authUser, mainTopicId } = req.body;
		const irrelTopic = await IrrelevantTopicRepo.findOne(
			authUser.id,
			mainTopicId
		);
		if (irrelTopic) {
			await IrrelevantTopicRepo.removeOne(authUser.id, mainTopicId);
			return res.json({
				msg: "Topic has been marked as relevant"
			});
		} else {
			await IrrelevantTopicRepo.insertOne(authUser.id, mainTopicId);
			return res.json({
				msg: "Topic has been marked as irrelevant"
			});
		}
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
