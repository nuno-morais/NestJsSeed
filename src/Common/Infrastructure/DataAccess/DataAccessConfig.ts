import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';

@Component()
export abstract class DataAccessConfig {
    public abstract GetConfiguration(): ConnectionOptions;
}