import { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.module';

const serverConfig: ApplicationConfig = {
  providers: [
    appConfig.providers || [],
    provideServerRendering()
  ]
};

export const config = serverConfig;
