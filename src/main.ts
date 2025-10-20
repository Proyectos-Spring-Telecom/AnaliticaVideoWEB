import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// 👇 REGISTRA TU LICENCIA DE DEVEXTREME ANTES DEL BOOTSTRAP
import config from 'devextreme/core/config';
import { environment } from './environments/environment';

if (environment?.dxLicenseKey) {
  // 'as any' evita que TypeScript se queje del tipo
  config({ licenseKey: environment.dxLicenseKey } as any);
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
