import { Request, Response } from "express";

export abstract class BaseController {
  protected sendSuccess(res: Response, data: any, statusCode: number = 200): Response {
    return res.status(statusCode).json(data);
  }
  
  protected sendError(res: Response, error: any, statusCode: number = 500): Response {
    console.error(error);
    return res.status(statusCode).json({ 
      error: error instanceof Error ? error.message : error 
    });
  }
  
  protected sendNotFound(res: Response, message: string = "Resource not found"): Response {
    return res.status(404).json({ message });
  }
  
  protected sendBadRequest(res: Response, message: string): Response {
    return res.status(400).json({ message });
  }
}