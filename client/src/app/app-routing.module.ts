import { MessagesListComponent } from './components/admin-page/messages-list/messages-list.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';

const routes: Routes = [
    { path: 'home', component: HomeLayoutComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            { path: 'portfolio', component: PortfolioPageComponent },
            { path: 'auth', component: AuthPageComponent },
            {
                path: 'admin',
                component: AdminPageComponent,
                children: [
                    {
                        path: 'messages',
                        component: MessagesListComponent,
                    },
                    {
                        path: 'works',
                        component: MessagesListComponent,
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
