import { Request, Response } from "express";
import BadRequestError from "../../errors/BadRequestError";
import { MessageRepo } from "../../repo/MessageRepo";
import sendErrorResponse from "../../sendErrorResponse";

export = async (req: Request, res: Response) => {
  try {
    const messages = await MessageRepo.getAdminUnreadMessages();
    res.json({
      messages: messages
    });
  } catch (error: any) {
    if (error instanceof BadRequestError) {
      return sendErrorResponse(res, error.statusCode, error.message);
    }
    return sendErrorResponse(res, 500, error.message);
  }
}