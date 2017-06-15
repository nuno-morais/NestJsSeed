import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { DataAccessService } from "./DataAccessService";
import { DataAccessConfig } from "./DataAccessConfig";
import { v4 as uuid } from 'uuid';
@Component()
export abstract class DatabaseConfig extends DataAccessConfig 
{
    protected abstract GetEntitiesFolder(): string[];

    public GetConfiguration(): ConnectionOptions 
    {
        return {
            name: this.constructor.name + "_" + uuid(),
            driver: {
                type: process.env.DB_DRIVER || "sqlite",
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME || "Budget",
                storage: process.env.DB_STORAGE_NAME || "db.lite"
            },
            entities: 
                this.GetEntitiesFolder()
            ,
            autoSchemaSync: true,
        }
    }
}