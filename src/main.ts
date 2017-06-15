import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { ApplicationModule } from './app.module';
import 'reflect-metadata';
import 'dotenv/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());


const nest = NestFactory.create(ApplicationModule, app);

nest.listen(process.env.PORT || 3000,() => 
	{
	    console.log(`Nest app is listening on port ${process.env.PORT}.`);
	}
);