import { Request, Response } from "express";
import BadRequestError from "../../errors/BadRequestError";
import ParentRepo from "../../repo/ParentRepo";
import sendErrorResponse from "../../sendErrorResponse";

export = async (req: Request, res: Response) => {
	try {
		const { email, newPregnancyStage } = req.body;
		await ParentRepo.updateOne(
			"pregnancy_stage",
			newPregnancyStage,
			email
		);
		res.json({
			msg: "Child birth updated"
		});
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
