import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { NotFoundException } from '../../Common/Exceptions/NotFoundException';
import { BadRequestException } from '../../Common/Exceptions/BadRequestException';
import { UnauthorizedRequestException } from '../../Common/Exceptions/UnauthorizedRequestException';
import { ForbiddenException } from '../../Common/Exceptions/ForbiddenException';

@Catch(NotFoundException, BadRequestException, UnauthorizedRequestException, ForbiddenException, Error)
export class ExceptionsFilter implements ExceptionFilter 
{
    public catch(exception, response) 
    {
        let message = exception.message;
        if (exception instanceof NotFoundException)
        {
            response.status(HttpStatus.NOT_FOUND);
        }
        else if (exception instanceof BadRequestException)
        {
            response.status(HttpStatus.BAD_REQUEST);
        }
        else if (exception instanceof ForbiddenException)
        {
            response.status(HttpStatus.FORBIDDEN);
        }
        else if (exception instanceof UnauthorizedRequestException)
        {
            response.status(HttpStatus.UNAUTHORIZED);
        } 
        else if (exception instanceof Error)
        {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
        } 
        
        response.send({ message: message});
    }
}