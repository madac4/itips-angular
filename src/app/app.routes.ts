import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { TipComponent } from './pages/tip/tip.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SuccessComponent } from './pages/success/success.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'tip/:code', component: TipComponent, title: 'Lasă bacșiș' },
    { path: 'success', component: SuccessComponent, title: 'Mulțumim!' },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Pagina nu a fost găsită',
    },
];
