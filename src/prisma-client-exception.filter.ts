
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    let response = ctx.getResponse<Response>()
    let status: HttpStatus;
    let message: string;
    switch (exception.code) {

      // unique constraint error
      case 'P2002':
        status = HttpStatus.CONFLICT
        message = exception.message.replace(/\n/g, "")
        if (message.includes("email")) {
          response.status(status).send({ status, message: "that email is already registered" })
          return
        }
        response.status(status).send({ status, message })
        break;
      default:
        super.catch(exception, host)
        break;
    }
  }
}
