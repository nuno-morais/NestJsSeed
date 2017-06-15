import { MiddlewaresConsumer, RequestMethod, Module } from '@nestjs/common';
import { EnsureLoggedInMiddleware } from './Common/Infrastructure/Login/EnsureLoggedInMiddleware';
import { DataAccessConfig } from "./Common/Infrastructure/DataAccess/DataAccessConfig";
import { CoreModule } from './Core/CoreModule';


@Module({
	modules: [CoreModule]
})

export class ApplicationModule {
}