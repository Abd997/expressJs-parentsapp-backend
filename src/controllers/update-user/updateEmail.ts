import { Request, Response } from "express";
import BadRequestError from "../../errors/BadRequestError";
import ParentRepo from "../../repo/ParentRepo";
import sendErrorResponse from "../../sendErrorResponse";

export = async (req: Request, res: Response) => {
	try {
		const { email, newEmail } = req.body;
		const emailExists = await ParentRepo.findUser(newEmail);
		if (emailExists) {
			throw new BadRequestError("Email already in use");
		}
		await ParentRepo.updateOne("email", newEmail, email);
		res.json({
			msg: "Email updated"
		});
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
