import { BuildingPageComponent } from './components/building-page/building-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';
import { ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
    { path: 'home', component: HomeLayoutComponent, data: { title: 'Главная' } },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            {
                path: 'portfolio',
                component: PortfolioPageComponent,
                data: { title: 'Портфолио' },
            },
            {
                path: 'building/:id',
                component: BuildingPageComponent,
                data: { title: 'Работа' },
            },
            {
                path: 'auth',
                component: AuthPageComponent,
                data: { title: 'Аутентификация' },
            },
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
