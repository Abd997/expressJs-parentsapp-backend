import { Request, Response } from "express";
import BadRequestError from "../errors/BadRequestError";
import ParentRepo from "../repo/ParentRepo";
import sendErrorResponse from "../sendErrorResponse";

export = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const user = await ParentRepo.findUser(email);
		return res.json({
			user: user
		});
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
