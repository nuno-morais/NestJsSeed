import { Module,  MiddlewaresConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { EnsureLoggedInMiddleware } from './../../Common/Infrastructure/Login/EnsureLoggedInMiddleware';
import { LanguagesController } from './LanguagesController';
import { DataAccessModule } from '../DataAccess/DataAccessModule';
import { LanguagesRepository } from './LanguagesRepository';
import { LanguageDataAccessConfig } from './LanguageDataAccessConfig';
import { DataAccessConfig } from "./../../Common/Infrastructure/DataAccess/DataAccessConfig";
import { ModuleBase } from './../../Common/Infrastructure/Modules/ModuleBase';
import { LanguagesBusinessRules } from './LanguagesBusinessRules';

@Module({    
	modules: [DataAccessModule],
    controllers: [ LanguagesController ],
	components: [
		LanguagesRepository,
		LanguagesBusinessRules,
		{ provide: DataAccessConfig, useClass: LanguageDataAccessConfig }],
    exports: [LanguagesBusinessRules]
})

export class LanguagesModule extends ModuleBase 
{
	protected GetRoutesToProtect(): Array<string>
	{
		let routes: Array<string> = [];
		let routeName = "Languages";
		routes.push(routeName, routeName + "/:id", routeName + "/:id/LowLevel", routeName+ "/Current");
		return routes;
	}
}