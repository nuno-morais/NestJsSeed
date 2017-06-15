import { Component } from '@nestjs/common';
import { IDataAccessServiceOf } from './../DataAccess/IDataAccessServiceOf';
import { IEntity } from './../DataAccess/IEntity';
import { NotFoundException } from '../../Common/Exceptions/NotFoundException';

@Component()
export abstract class AuthorizationService
{
    
    public abstract async Get(id: string) : Promise<IEntity>;
}