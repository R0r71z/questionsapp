import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {AppComponent} from './app.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        component: HomeComponent
    }

];

export const routing = RouterModule.forRoot(appRoutes);