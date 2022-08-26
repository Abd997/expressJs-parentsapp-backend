import { Request, Response } from "express";
import BadRequestError from "../../errors/BadRequestError";
import ParentRepo from "../../repo/ParentRepo";
import sendErrorResponse from "../../sendErrorResponse";

export = async (req: Request, res: Response) => {
	try {
		const { email, newUserAge } = req.body;
		await ParentRepo.updateOne("age", newUserAge, email);
		res.json({
			msg: "User age updated"
		});
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
