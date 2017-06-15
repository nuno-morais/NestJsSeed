import { Component } from '@nestjs/common';
import { DataAccessService } from "../../Common/Infrastructure/DataAccess/DataAccessService";
import { Language } from './Language.entity';
import { ObjectType } from 'typeorm';
import { RepositoryBase } from '../../Common/Infrastructure/Repositories/RepositoryBase';

@Component()
export class LanguagesRepository extends RepositoryBase<Language> 
{   
    public constructor(databaseService: DataAccessService) 
    {
        super(databaseService);
    }

    protected GetEntityType() : ObjectType<Language> | string
    {
        return Language;
    }
}