import { Controller, Get, Req, Res, Inject } from '@nestjs/common';
import { NextServerToken, NextServer } from './nextjs.provider';
import { Request, Response } from 'express';

@Controller()
export class NextController {
  constructor(@Inject(NextServerToken) private nextServer: NextServer) {}

  @Get('*')
  async nextHandler(@Req() req: Request, @Res() res: Response) {
    this.nextServer.getRequestHandler()(req, res);
  }
}
