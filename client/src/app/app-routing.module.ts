import { BuildingPageComponent } from './components/building-page/building-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';
import { ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
    { path: 'home', component: HomeLayoutComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            { path: 'portfolio', component: PortfolioPageComponent },
            { path: 'building/:id', component: BuildingPageComponent },
            { path: 'auth', component: AuthPageComponent },
            {
                path: 'admin',
                loadChildren: () =>
                    import('./admin/admin.module').then((m) => m.AdminModule),
                canActivate: [ProtectedGuard],
            },
        ],
    },
    { path: '**', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
