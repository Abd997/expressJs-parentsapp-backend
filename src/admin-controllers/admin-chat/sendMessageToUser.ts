import { Request, Response } from "express";
import BadRequestError from "../../errors/BadRequestError";
import AdminRepo from "../../repo/AdminRepo";
import { MessageRepo } from "../../repo/MessageRepo";
import sendErrorResponse from "../../sendErrorResponse";

export = async (req: Request, res: Response) => {
  try {
    const userEmail: string = req.body.userEmail;
    const adminEmail: string = await AdminRepo.getAdminEmail();
    const message: string = req.body.userMessage;
    await MessageRepo.sendMessageToUser(userEmail, adminEmail, message);
    res.json({
      msg: "Message sent successfully"
    });
  } catch (error: any) {
    if (error instanceof BadRequestError) {
      return sendErrorResponse(res, error.statusCode, error.message);
    }
    return sendErrorResponse(res, 500, error.message);
  }
}