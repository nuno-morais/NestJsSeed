import { HttpException } from '@nestjs/core';
import { Component, Inject } from '@nestjs/common';

import { DataAccessService } from "../DataAccess/DataAccessService";
import { IEntity } from './../DataAccess/IEntity';
import { Repository, ObjectType, ObjectLiteral } from 'typeorm';
import { IDataAccessServiceOf } from '../DataAccess/IDataAccessServiceOf';
import { NotFoundException } from '../../Common/Exceptions/NotFoundException';

@Component()
export abstract class RepositoryBase<T extends IEntity> implements IDataAccessServiceOf<T> 
{
    protected DatabaseService: DataAccessService
    public constructor(databaseService: DataAccessService) 
    {
        this.DatabaseService = databaseService;
    }

    protected get Repository(): Promise<Repository<T>> 
    {
        return this.DatabaseService.GetRepository<T>(this.GetEntityType());
    }

    protected abstract GetEntityType() : ObjectType<T> | string;
    
    public async Add(entity: T): Promise<T>
    {
        return this.Repository.then(
            (repositoryResult) => {
                return repositoryResult.persist(entity);
            }
        );
    }

    public async AddAll(entities: T[]): Promise<T[]>
    {
        return this.Repository.then(
            (repositoryResult) => {
                return repositoryResult.persist(entities);
            }
        );
    }

    public async GetAll(options?: { [key: string]: any; }): Promise<T[]>
    {
        return this.Repository.then(
            (repositoryResult) => {
                return repositoryResult.find(options);
            }
        );
    }

    public async Get(id: string, options?: { [key: string]: any; }): Promise<T> 
    {
        if (options == null)
        {
            options = { Id: id };
        }
        else
        {
            options.Id = id;
        }
        
        return this.Repository.then(
            (repositoryResult) => 
            {
                return repositoryResult.find(options)
                    .then((entities) => 
                    {
                        if (entities == null || entities.length == 0 || entities.length > 1)
                        {
                            throw new NotFoundException(`Could not find any entity with id: ${id}`);
                        }
                        return entities.pop();
                    });
            }
        );
    }

    public async Update(entity: T): Promise<T> 
    {
         return this.Repository.then(
            (repositoryResult) => {
                return repositoryResult.persist(entity);
            }
        );
    }

    public async Remove(entity: T): Promise<T> 
    {
        return this.Repository.then(
            (repositoryResult) => {
                entity.IsDeleted = true;
                return repositoryResult.persist(entity);
            }
        );
    }

    public async RemoveLowLevel(entity: T): Promise<T>
    {
        return this.Repository.then(
            (repositoryResult) => {
                return repositoryResult.remove(entity);
            }
        );
    }
}