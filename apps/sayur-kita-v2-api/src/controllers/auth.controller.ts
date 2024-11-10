import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { Auth } from "../models/models";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await this.authService.login(
        email,
        password
      );
      const data = { accessToken, refreshToken, user };
      res.status(200).send({
        data: {
          user: data.user,
          access_token: data.accessToken,
          refresh_token: data.refreshToken,
        },
        message: "Successfully login",
        status: res.statusCode,
      });
    } catch (error: any) {
      res.status(404).send({
        message: `Failed to login`,
        detail: error.errors,
        status: res.statusCode,
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const user: Auth = req.body;
      await this.authService.register(user);
      res.status(201).send({
        message: "Successfully register",
        status: res.statusCode,
      });
    } catch (error: any) {
      res.status(400).send({
        message: `Failed to register : ${error.errors[0].message.toString()}`,
        status: res.statusCode,
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const data = await this.authService.refreshToken(refreshToken);
    if (data) {
      res.status(200).send({
        data: {
          refresh_token: data,
        },
        message: "Token updated",
        status: res.statusCode,
      });
    } else {
      res.status(400).send({
        message: "Failed to retrieve refresh token. Please try again later.",
        status: res.statusCode,
      });
    }
  }
}
