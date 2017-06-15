import { MiddlewaresConsumer, MiddlewareConfigProxy, RequestMethod, NestModule } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { EnsureLoggedInMiddleware } from './../Login/EnsureLoggedInMiddleware';

export abstract class ModuleBase implements NestModule 
{
	protected abstract GetRoutesToProtect(): Array<string>;

    configure(consumer: MiddlewaresConsumer) 
    {
        let middlewareConfigProxy: MiddlewareConfigProxy = consumer.apply(EnsureLoggedInMiddleware);
        let routes = this.GetRoutesToProtect();
        for(let routePath of routes)
        {
            middlewareConfigProxy.forRoutes(
            {
                path: routePath,
                method: RequestMethod.ALL
            });
        }
    } 
}