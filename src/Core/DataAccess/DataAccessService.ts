import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { createConnection, Connection, EntityManager, Repository, ObjectType, Entity } from 'typeorm';
import { DataAccessService as DataAccessServiceBase } 
    from '../../Common/Infrastructure/DataAccess/DataAccessService';
import { DataAccessConfig } from '../../Common/Infrastructure/DataAccess/DataAccessConfig';

@Component()
export class DataAccessService extends DataAccessServiceBase
{
    private connection: Connection;

    public constructor(databaseConfig: DataAccessConfig) 
    { 
        super(databaseConfig);
    }

    protected get Connection(): Promise<Connection> 
    {
        if(this.connection) 
        {
            return Promise.resolve(this.connection);
        }
        return createConnection(this.DatabaseConfig.GetConfiguration())
            .then(
                (connection) => 
                {
                    this.connection = connection;
                    return connection;
                }
            ).catch(
                (error) => 
                {
                    throw error;
                }
            );
    }

    public async GetEntityManager(): Promise<EntityManager> {
        return this.Connection.then(
            (connectionResult) => 
            { 
                return connectionResult.entityManager;
            });
    }

    public async GetRepository<T>(entityClassOrName: ObjectType<T> | string): Promise<Repository<T>> 
    {
        return this.Connection.then(
            (connectionResult) => 
            { 
                return connectionResult.getRepository<T>(entityClassOrName);
            });
    }
}