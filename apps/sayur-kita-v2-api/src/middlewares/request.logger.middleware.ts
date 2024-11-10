import { Request, Response, NextFunction } from "express";

export class RequestLoggerMiddleware {
  requestLogger() {
    return (req: Request, res: Response, next: NextFunction) => {
      const { method, url } = req;
      const timestamp = new Date().toString();

      console.log(`${timestamp} - [${method}] : ${url}`);
      next();
    };
  }
}
