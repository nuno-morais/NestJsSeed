import { NestModule, Module } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { DataAccessService as DataAccessServiceImpl} from "./DataAccessService";
import { DataAccessService  } 
    from "./../../Common/Infrastructure/DataAccess/DataAccessService";

@Module({
    components: [DataAccessServiceImpl],
    exports: [DataAccessServiceImpl, 
        { provide: DataAccessService, useClass: DataAccessServiceImpl }
    ]
})
export class DataAccessModule 
{
    
}