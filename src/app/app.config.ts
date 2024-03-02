import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LucideAngularModule, Loader2 } from 'lucide-angular';
import { provideHttpClient } from '@angular/common/http';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHotToastConfig(),
        provideHttpClient(),
        importProvidersFrom(LucideAngularModule.pick({ Loader2 })),
    ],
};
