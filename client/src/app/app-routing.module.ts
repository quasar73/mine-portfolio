import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';

const routes: Routes = [
    { path: 'home', component: HomeLayoutComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
