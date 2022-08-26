import { Request, Response } from "express";
import BadRequestError from "../../errors/BadRequestError";
import UserArticlePreferenceRepo from "../../repo/UserArticlePreferenceRepo";
import sendErrorResponse from "../../sendErrorResponse";

export = async (req: Request, res: Response) => {
	try {
		const { authUser, articleId } = req.body;
		let oldPreference = await UserArticlePreferenceRepo.findOne(
			authUser.id,
			articleId
		);
		if (!oldPreference) {
			oldPreference = await UserArticlePreferenceRepo.insertOne(
				authUser.id,
				articleId
			);
		}
		if (oldPreference.is_read) {
			await UserArticlePreferenceRepo.updateOne(
				authUser.id,
				articleId,
				"is_read",
				false
			);
			return res.json({
				isRead: false,
				msg: "Article has been marked as unread"
			});
		} else {
			await UserArticlePreferenceRepo.updateOne(
				authUser.id,
				articleId,
				"is_read",
				true
			);
			return res.json({
				isRead: true,
				msg: "Article has been marked as read"
			});
		}
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
