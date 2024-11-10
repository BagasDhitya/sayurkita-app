import { Request, Response, NextFunction } from "express";

interface RequestData {
  count: number;
  lastRequestTime: number;
}

export class RateLimitMiddleware {
  private RATE_LIMIT: number;
  private TIME_WINDOW: number;
  private requestCounts: { [key: string]: RequestData };

  constructor() {
    this.RATE_LIMIT = 3;
    this.TIME_WINDOW = 60 * 1000;
    this.requestCounts = {};
  }

  rateLimit(req: Request, res: Response, next: NextFunction): any {
    const adminId = (req as any).user?.id;

    if (!adminId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const currentTime = Date.now();

    if (!this.requestCounts[adminId]) {
      this.requestCounts[adminId] = { count: 0, lastRequestTime: currentTime };
    }

    const adminData = this.requestCounts[adminId];

    if (currentTime - adminData.lastRequestTime > this.TIME_WINDOW) {
      adminData.count = 0;
      adminData.lastRequestTime = currentTime;
    }

    if (adminData.count >= this.RATE_LIMIT) {
      return res.status(429).json({
        message: "Rate limit exceeded. Only 3 product creations are allowed.",
      });
    }

    adminData.count += 1;
    adminData.lastRequestTime = currentTime;
    next();
  }
}
