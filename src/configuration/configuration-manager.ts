import { Dependencies, Inject, Injectable } from '@nestjs/common';
import { Configuration } from './configuration';
import { getLocalConfig } from './configuration-manager.utils';

export interface IConfigurationManager {
  getConfiguration(): Configuration;
}

//GR: This was using the JavaScript configuration for this function rather than TS. Updated as per NestJS documentation https://docs.nestjs.com/fundamentals/custom-providers
@Injectable()
@Dependencies('CONFIG')
export class ConfigurationManager implements IConfigurationManager {
  private configuration: Configuration;

  constructor(private config: Configuration) {
    this.configuration = this.config;
  }

  getConfiguration(): Configuration {
    return this.configuration;
  }
}

export class MockedConfigurationManager implements IConfigurationManager {
  private configuration: Configuration;

  constructor(private configOverrides?: Partial<Configuration>) {
    this.configuration = { ...getLocalConfig(), ...configOverrides };
  }

  getConfiguration(): Configuration {
    return this.configuration;
  }
}
