import { Component } from '@nestjs/common';
import { DatabaseConfig } from "./../../Common/Infrastructure/DataAccess/DatabaseConfig";

@Component()
export class LanguageDataAccessConfig extends DatabaseConfig 
{ 
        protected GetEntitiesFolder(): string[]
        {
            return [__dirname + '/*.entity.ts'];
        }
}