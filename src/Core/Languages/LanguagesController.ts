import { Module, Response, Param, Request, Controller, Get  } from '@nestjs/common';
import { Language } from './Language.entity';
import { LanguagesBusinessRules } from './LanguagesBusinessRules';
import { CRUDController } from '../../Common/Infrastructure/Controllers/CRUDController';

@Controller(LanguagesController.RouteName)
export class LanguagesController extends CRUDController<Language>
{
    public static RouteName: string = "Languages";

    public constructor(languagesBusinessRules: LanguagesBusinessRules)
    {
        super(languagesBusinessRules);
    }
    
    @Get()
    public async GetAll(@Request() req, @Response() res) 
    {
        return super.GetAll(req, res);
    }

    @Get('/:id')
    public async Get(@Request() req, @Response() res, @Param('id') id) 
    {
        return super.Get(req, res ,id);
    }



    protected GetEntityType() : string
    {
        return "Language";
    }
}