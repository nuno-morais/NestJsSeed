import { IEntity } from './IEntity';
export interface IDataAccessServiceOf<T extends IEntity>
{
    Add(entity: T): Promise<T>;
    GetAll(options?: { [key: string]: any; }): Promise<T[]>;
    Get(id: string, options?: { [key: string]: any; }): Promise<T>;
    Update(entity: T): Promise<T>;
    Remove(entity: T): Promise<T>;
    RemoveLowLevel(entity: T) : Promise<T>;
}