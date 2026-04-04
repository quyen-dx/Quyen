import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import { MenuFoldOutline, ProductOutline, TeamOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { routes } from './app.routes';
registerLocaleData(en);
const icons: IconDefinition[] = [ProductOutline, UserOutline, TeamOutline, MenuFoldOutline];
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzI18n(en_US),
    provideNzIcons(icons)
  ],
};
