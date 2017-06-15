import { Component } from '@nestjs/common';
import { IDataAccessServiceOf } from './../DataAccess/IDataAccessServiceOf';
import { IEntity } from './../DataAccess/IEntity';

@Component()
export abstract class CRUDBusinessRulesOf<T extends IEntity>
{
    protected Repository: IDataAccessServiceOf<T>;

    protected constructor(repository: IDataAccessServiceOf<T>)
    {
        this.Repository = repository;
    }
    
    public async GetAll(options?: { [key: string]: any; }) : Promise<Array<T>>
    {   
        let optionsWithDeleted = this.GetOptionsWithDeleted(options);
        return this.Repository.GetAll({ IsDeleted: false });
    }

    private GetOptionsWithDeleted(options?: { [key: string]: any; }) :  { [key: string]: any }
    {
        options = this.CreateOptionsIfNull(options);
        options.IsDeleted = false;
        return options;
    }

    private CreateOptionsIfNull(options?: { [key: string]: any; }) :  { [key: string]: any }
    {
        if (options == null)
        {
            options = {};
        }
        return options;
    }

    public async Get(id: string, options?: { [key: string]: any; }) : Promise<T>
    {
        return this.Repository.Get(id, { IsDeleted: false });
    }

    public async Create(entity: T) : Promise<T>
    {
        return this.Repository.Add(entity);
    }

    public async Update(entity: T) : Promise<T>
    {
        await this.Repository.Get(entity.Id, { IsDeleted: false });
        return this.Repository.Update(entity);
    }

    public async Delete(entity: T) : Promise<T>
    {
        return this.Repository.Remove(entity);
    }

    public async GetIncludeDeleted(id: string, options?: { [key: string]: any; }) : Promise<T>
    {
        options = this.CreateOptionsIfNull(options);
        return this.Repository.Get(id, options);
    }
    
    public async GetAllIncludeDeleted(options?: { [key: string]: any; }) : Promise<Array<T>>
    {
        options = this.CreateOptionsIfNull(options);
        return this.Repository.GetAll(options);
    }

    public async DeleteLowLevel(entity: T) : Promise<T>
    {
        return this.Repository.RemoveLowLevel(entity);
    }
}