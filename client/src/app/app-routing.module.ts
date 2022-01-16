import { BaseLaytoutComponent } from './components/base-laytout/base-laytout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';

const routes: Routes = [
    { path: 'home', component: HomeLayoutComponent },
    {
        path: '',
        component: BaseLaytoutComponent,
        children: [{ path: 'portfolio', component: PortfolioPageComponent }],
    },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
