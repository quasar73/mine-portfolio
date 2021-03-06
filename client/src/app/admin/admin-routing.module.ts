import { SettingsPageComponent } from './../components/admin-page/settings-page/settings-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { MessagesListComponent } from '../components/admin-page/messages-list/messages-list.component';
import { WorksListComponent } from '../components/admin-page/works-list/works-list.component';

const routes: Routes = [
    {
        path: '',
        component: AdminPageComponent,
        children: [
            {
                path: 'messages',
                component: MessagesListComponent,
                data: { title: 'Сообщения' },
            },
            {
                path: 'works',
                component: WorksListComponent,
                data: { title: 'Работы' },
            },
            {
                path: 'settings',
                component: SettingsPageComponent,
                data: { title: 'Настройки' },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
