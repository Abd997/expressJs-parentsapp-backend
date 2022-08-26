import { Request, Response } from "express";
import BadRequestError from "../errors/BadRequestError";
import IrrelevantSubTopicRepo from "../repo/IrrelevantSubTopicRepo";
import sendErrorResponse from "../sendErrorResponse";

export = async (req: Request, res: Response) => {
	try {
		const { authUser, subTopicId } = req.body;
		const irrelSubtopic = await IrrelevantSubTopicRepo.findOne(
			authUser.id,
			subTopicId
		);
		if (irrelSubtopic) {
			await IrrelevantSubTopicRepo.removeOne(authUser.id, subTopicId);
			return res.json({
				msg: "Sub topic has been marked as relevant"
			});
		} else {
			await IrrelevantSubTopicRepo.insertOne(authUser.id, subTopicId);
			return res.json({
				msg: "Sub topic has been marked as irrelevant"
			});
		}
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
