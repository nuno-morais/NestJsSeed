import { Module, HttpStatus, Response,  Param, Request, Body, Controller, UseFilters  } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { CRUDBusinessRulesOf } from '../BusinessRules/CRUDBusinessRulesOf';
import { IProfileEntity } from './../DataAccess/IProfileEntity';
import { IEntity } from './../DataAccess/IEntity';
import { ExceptionsFilter } from '../MiddlewareExceptions/ExceptionsFilter';
import { User  } from '../../Common/Models/Users/User';
import { IncludeUser, RequestArgument, UserArgument } from './../Authorization/Authorization';
import { v4 as uuid } from 'uuid';
import { AuthorizationService } from './../Authorization/AuthorizationService';

@UseFilters(new ExceptionsFilter())
export abstract class UserCRUDController<T extends IProfileEntity>
{
    protected BusinessRules: CRUDBusinessRulesOf<T>;
    protected AuthorizationService: AuthorizationService;

    public constructor(businessRules: CRUDBusinessRulesOf<T>, authorizationService: AuthorizationService)
    {
        this.BusinessRules = businessRules;
        this.AuthorizationService = authorizationService;
    }

    @IncludeUser
    public async GetAll(@RequestArgument @Request() req, @Response() res, @UserArgument user? : User ) : Promise<Array<T>>
    {
        return this.AuthorizationService.Get(user.Id).then((profile) => {
            return this.BusinessRules.GetAll({ ProfileId: profile.Id })
            .then((entities) => {
                this.RemoveIsDeletedFieldFromList(entities);
                res.status(HttpStatus.OK).json(entities);
                return entities;
            });
        });
    }

    public RemoveIsDeletedFieldFromList(entities: Array<T>) : void 
    {
        if (entities != null)
        {
            entities.forEach((entity) =>
            {
                this.RemoveIsDeletedField(entity);
            });
        }
    }

    public RemoveIsDeletedField(entity: T) : void 
    {
        if (entity != null)
        {
            delete entity.IsDeleted;
        }
    }

    @IncludeUser
    public async Get(@RequestArgument @Request() req, @Response() res, @Param('id') id, @UserArgument user? : User)  : Promise<T>
    {
        return this.AuthorizationService.Get(user.Id).then((profile) => {
            return this.BusinessRules.Get(id, { ProfileId: profile.Id })
                .then((entity) => {
                    this.RemoveIsDeletedField(entity);
                    res.status(HttpStatus.OK).json(entity);
                    return entity;
                });
        });
    }

    @IncludeUser
    public async Create(@RequestArgument @Request() req, @Response() res, @UserArgument user? : User) : Promise<T>
    {
        return this.AuthorizationService.Get(user.Id).then((profile) => {
            let entity: T = req.body;
            entity.ProfileId = profile.Id;
            entity.IsDeleted = false;
            entity.Id = uuid();
            return this.BusinessRules.Create(entity)
                .then((entityCreated) => {
                    this.RemoveIsDeletedField(entityCreated);
                    res.status(HttpStatus.CREATED).json(entityCreated);
                    return entity;
                });
        });
    }

    protected abstract GetEntityType() : string;

    @IncludeUser
    public async Update(@RequestArgument @Request() req, @Response() res, @Param('id') id, @UserArgument user? : User) : Promise<T>
    {
        return this.AuthorizationService.Get(user.Id).then((profile) => {
            return this.BusinessRules.Get(id, { ProfileId: profile.Id }).then((entity) =>
            {
                let entityToUpdate: T = req.body;
                entityToUpdate.ProfileId = profile.Id;
                for(var prop in entityToUpdate)
                {
                    entity[prop] = entityToUpdate[prop];
                }
                entityToUpdate = entity;
                return this.BusinessRules.Update(entityToUpdate)
                    .then((entityUpdated) => {
                        this.RemoveIsDeletedField(entityUpdated);
                        res.status(HttpStatus.OK).json(entityUpdated);
                        return entityUpdated;
                    });
            });
        });
    }

    @IncludeUser
    public async Delete(@RequestArgument @Request() req, @Response() res, @Param('id') id, @UserArgument user? : User) : Promise<T>
    {
        return this.AuthorizationService.Get(user.Id).then((profile) => {
            return this.BusinessRules.Get(id, { ProfileId: profile.Id }).then((entityToDelete) =>{
                return this.BusinessRules.Delete(entityToDelete)
                .then((entityDeleted) => {
                    this.RemoveIsDeletedField(entityDeleted);
                    res.status(HttpStatus.OK).json(entityDeleted);
                    return entityDeleted;
                });
            });
        });
    }

    @IncludeUser
    public async DeleteLowLevel(@RequestArgument @Request() req, @Response() res, @Param('id') id, @UserArgument user? : User) : Promise<T>
    {
        return this.AuthorizationService.Get(user.Id).then((profile) => {
            return this.BusinessRules.GetIncludeDeleted(id, { ProfileId: profile.Id })
                .then((entityToDelete) => {
                return this.BusinessRules.DeleteLowLevel(entityToDelete)
                    .then((entityDeleted) => {
                        this.RemoveIsDeletedField(entityDeleted);
                        res.status(HttpStatus.OK).json(entityDeleted);
                        return entityDeleted;
                    });
            });
        });
    }
}