import { Component } from '@nestjs/common';
import { LanguagesRepository } from './LanguagesRepository';
import { Language } from './Language.entity';
import { CRUDBusinessRulesOf } from '../../Common/Infrastructure/BusinessRules/CRUDBusinessRulesOf';


@Component()
export class LanguagesBusinessRules extends CRUDBusinessRulesOf<Language>
{

    public constructor(languagesRepository: LanguagesRepository)
    {
        super(languagesRepository);
    }
}