import { Entity, Column, PrimaryColumn } from 'typeorm';
import { IEntity } from  "./../../Common/Infrastructure/DataAccess/IEntity";
import { v4 as uuid } from "uuid";

@Entity()
export class Language implements IEntity
{

    public static Create(name: string, code: string, id?: string): Language
    {
        let language: Language = new Language();
        language.Id = id || uuid();
        language.Name = name;
        language.Code  = code;
        return language;
    }

    @PrimaryColumn()
    public Id: string;

    @Column()
    public Name: string;

    @Column()
    public Code: string;

    @Column()
    public IsDeleted: boolean = false;

    public constructor(){}
}