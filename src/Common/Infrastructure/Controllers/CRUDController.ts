import { Module, HttpStatus, Response,  Param, Request, Body, Controller, UseFilters  } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { CRUDBusinessRulesOf } from '../BusinessRules/CRUDBusinessRulesOf';
import { IEntity } from '../DataAccess/IEntity';
import { ExceptionsFilter } from '../MiddlewareExceptions/ExceptionsFilter';
import { User  } from '../../Common/Models/Users/User';
import {IncludeUser, RequestArgument, UserArgument} from './../Authorization/Authorization';


@UseFilters(new ExceptionsFilter())
export abstract class CRUDController<T extends IEntity>
{
    protected BusinessRules: CRUDBusinessRulesOf<T>;
    
    public constructor(businessRules: CRUDBusinessRulesOf<T>)
    {
        this.BusinessRules = businessRules;
    }

    @IncludeUser
    public async GetAll(@RequestArgument @Request() req, @Response() res, @UserArgument user? : User ) : Promise<Array<T>>
    {
        return this.BusinessRules.GetAll()
        .then((entities) => {
            this.RemoveHiddenFieldsFromList(entities);
            res.status(HttpStatus.OK).json(entities);
            return entities;
        });
    }

    public RemoveHiddenFieldsFromList(entities: Array<T>) : void 
    {
        if (entities != null)
        {
            entities.forEach((entity) =>
            {
                this.RemoveHiddenFields(entity);
            });
        }
    }

    public RemoveHiddenFields(entity: T) : void 
    {
        if (entity != null)
        {
            delete entity.IsDeleted;
            delete entity["Auth0Id"];
        }
    }

    @IncludeUser
    public async Get(@RequestArgument @Request() req, @Response() res, @Param('id') id, @UserArgument user? : User)  : Promise<T>
    {
        return this.BusinessRules.Get(id)
            .then((entity) => {
                this.RemoveHiddenFields(entity);
                res.status(HttpStatus.OK).json(entity);
                return entity;
            });
    }

    @IncludeUser
    public async Create(@RequestArgument @Request() req, @Response() res, @UserArgument user? : User) : Promise<T>
    {
        let entity: T = req.body[this.GetEntityType()];
        return this.BusinessRules.Create(entity)
            .then((entityCreated) => {
                this.RemoveHiddenFields(entityCreated);
                res.status(HttpStatus.CREATED).json(entityCreated);
                return entity;
            });
    }

    protected abstract GetEntityType() : string;

    @IncludeUser
    public async Update(@RequestArgument @Request() req, @Response() res, @Param('id') id, @UserArgument user? : User) : Promise<T>
    {
        let entityToUpdate: T = req.body;
        return this.BusinessRules.Update(entityToUpdate)
            .then((entityUpdated) => {
                this.RemoveHiddenFields(entityUpdated);
                res.status(HttpStatus.OK).json(entityUpdated);
                return entityUpdated;
            });
    }

    @IncludeUser
    public async Delete(@RequestArgument @Request() req, @Response() res, @Param('id') id, @UserArgument user? : User) : Promise<T>
    {
        let entityToDelete: T = await this.BusinessRules.Get(id);
        return this.BusinessRules.Delete(entityToDelete)
            .then((entityDeleted) => {
                this.RemoveHiddenFields(entityDeleted);
                res.status(HttpStatus.OK).json(entityDeleted);
                return entityDeleted;
            });
    }

    @IncludeUser
    public async DeleteLowLevel(@RequestArgument @Request() req, @Response() res, @Param('id') id, @UserArgument user? : User) : Promise<T>
    {
        let entityToDelete: T = await this.BusinessRules.GetIncludeDeleted(id);
        return this.BusinessRules.DeleteLowLevel(entityToDelete)
            .then((entityDeleted) => {
                this.RemoveHiddenFields(entityDeleted);
                res.status(HttpStatus.OK).json(entityDeleted);
                return entityDeleted;
            });
    }
}