import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {AppComponent} from './app.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './_layout/app_layout/layout.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '',component: HomeComponent},
            {path: 'dashboard',component: DashboardComponent},
            {path: 'login',component: LoginComponent}
        ]
    },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);