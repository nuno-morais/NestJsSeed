import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { EntityManager, Repository, ObjectType, Entity } from 'typeorm';
import { DataAccessConfig } from './DataAccessConfig';
@Component()
export abstract class DataAccessService {
    
    protected get DatabaseConfig(): DataAccessConfig
    {
        return this.databaseConfig;
    }

    public constructor(private readonly databaseConfig: DataAccessConfig)
    {  }
    
    public abstract async GetEntityManager(): Promise<EntityManager>;
    
    public abstract async GetRepository<T>(entityClassOrName: ObjectType<T> | string): Promise<Repository<T>>;
}