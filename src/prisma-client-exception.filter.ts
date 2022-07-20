
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

      case 'P2000':
        status = HttpStatus.BAD_REQUEST;
        message = "the input value is too long for that field";
        response.status(status).send({ status, message });
        break;

      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = "the record you specified was not found"
        response.status(status).send({ status, message })
        break;

      // unique constraint error
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = exception.message.replace(/\n/g, "");
        if (message.includes("email")) {
          response.status(status).send({ status, message: "that email is already registered" });
          break;
        } else if (message.includes("name")) {
          response.status(status).send({ status, message: "that name already exists" });
          break;
        }
        response.status(status).send({ status, message });
        break;
      default:
        super.catch(exception, host)
        break;
    }
  }
}
