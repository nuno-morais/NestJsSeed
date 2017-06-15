import { Module } from '@nestjs/common';
import { DataAccessModule } from "./DataAccess/DataAccessModule";
import { DataAccessService as DataAccessServiceBase } from "../Common/Infrastructure/DataAccess/DataAccessService";

import { LanguagesModule } from './Languages/LanguagesModule';
import { LanguagesBusinessRules } from './Languages/LanguagesBusinessRules';
import { Language } from './Languages/Language.entity';

@Module({
	modules: [LanguagesModule]
})

export class CoreModule 
{
    constructor(private languagesBR: LanguagesBusinessRules)
	{
		this.Initialize();
	}

	public async Initialize():Promise<void>
	{
		await this.InitializeLanguages();
		return Promise.resolve();
	}

	private async InitializeLanguages() : Promise<void>  
	{
		let english: Language = Language.Create("English","EN","DA0A5475-F97F-4CB5-BE1F-8503D40196EA");
		let portugues: Language = Language.Create("Portuguese","PT","DA7BC8FD-F49F-4F84-9B12-541BD91AF284");
		await this.languagesBR.Create(english);
		await this.languagesBR.Create(portugues);
		return Promise.resolve();
	}
}