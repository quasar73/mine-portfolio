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
        children: [{ path: 'portfolio', component: PortfolioPageComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
