import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    // proveemos HttpClientModule en el arranque de la aplicación
    importProvidersFrom(HttpClientModule),
    // y tus otros providers que tengas en appConfig
    ...appConfig.providers || [],
  ]
}).catch((err) => console.error(err));
