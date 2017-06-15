import { Component, Middleware, NestMiddleware, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
const jwt = require('jsonwebtoken');
import 'dotenv/config';


@Middleware()
export class EnsureLoggedInMiddleware implements NestMiddleware 
{
    private readonly unauthorizedMessage: string = "Missing or invalid token";

    constructor() 
    {

    }

    resolve() {
        return (req, res, next) => 
        {   
            if (req.headers.authorization != null)
            {
                var token = (req.headers.authorization).split(' ')[1];
                jwt.verify(token, process.env.AUTH0_CLIENT_SECRET, 
                     (err, result) => {
                        if (err) 
                        {
                            return res.status(HttpStatus.UNAUTHORIZED).json({message: this.unauthorizedMessage }).send();
                        }
                        else
                        {
                            req.user = result;
                            next();
                        }
                });
            }
            else 
            {
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: this.unauthorizedMessage }).send();
            }
        }
    }
}