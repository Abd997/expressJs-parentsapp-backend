import { Request, Response } from "express";
import BadRequestError from "../../errors/BadRequestError";
import ParentRepo from "../../repo/ParentRepo";
import sendErrorResponse from "../../sendErrorResponse";

export = async (req: Request, res: Response) => {
	try {
		const { email, newUsername } = req.body;
		const usernameExists = await ParentRepo.findUserByUsername(
			newUsername
		);
		if (usernameExists) {
			throw new BadRequestError("Username already in use");
		}
		await ParentRepo.updateOne("username", newUsername, email);
		res.json({
			msg: "Username updated"
		});
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
