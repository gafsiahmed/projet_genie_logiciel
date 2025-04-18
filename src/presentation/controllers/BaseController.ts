import { Response } from "express";

export class BaseController {
  protected sendSuccess(res: Response, data: any, statusCode = 200): Response {
    return res.status(statusCode).json(data);
  }

  protected sendError(res: Response, error: any, message = "Internal server error"): Response {
    console.error(error);
    return res.status(500).json({ message, error: error.message });
  }

  protected sendBadRequest(res: Response, message: string): Response {
    return res.status(400).json({ message });
  }

  protected sendUnauthorized(res: Response, message: string): Response {
    return res.status(401).json({ message });
  }

  protected sendForbidden(res: Response, message: string): Response {
    return res.status(403).json({ message });
  }

  protected sendNotFound(res: Response, message: string): Response {
    return res.status(404).json({ message });
  }

  protected sendNoContent(res: Response, message?: string): Response {
    return res.status(204).json(message ? { message } : undefined);
  }
}