import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    TuiAccordionModule,
    TuiCarouselModule,
    TuiCheckboxLabeledModule,
    TuiInputFileModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiLazyLoadingModule,
    TuiMarkerIconModule,
    TuiPaginationModule,
    TuiTabsModule,
    TuiTextAreaModule,
    TuiToggleModule,
} from '@taiga-ui/kit';
import {
    TuiNotificationsModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiLinkModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule,
    TuiRootModule,
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { WorksAccordionComponent } from '../components/admin-page/works-list/works-accordion/works-accordion.component';
import { WorksListItemComponent } from '../components/admin-page/works-list/works-accordion/works-list-item/works-list-item.component';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { MessagesListComponent } from '../components/admin-page/messages-list/messages-list.component';
import { WorksListComponent } from '../components/admin-page/works-list/works-list.component';
import { SettingsPageComponent } from '../components/admin-page/settings-page/settings-page.component';

@NgModule({
    declarations: [
        WorksAccordionComponent,
        WorksListItemComponent,
        AdminPageComponent,
        MessagesListComponent,
        WorksListComponent,
        SettingsPageComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        TuiRootModule,
        TuiNotificationsModule,
        TuiButtonModule,
        TuiCarouselModule,
        TuiPaginationModule,
        TuiSvgModule,
        TuiTooltipModule,
        TuiHintModule,
        TuiLinkModule,
        TuiMarkerIconModule,
        TuiInputModule,
        TuiTextAreaModule,
        TuiInputPasswordModule,
        TuiTextfieldControllerModule,
        TuiTabsModule,
        TuiAccordionModule,
        TuiToggleModule,
        TuiCheckboxLabeledModule,
        TuiLazyLoadingModule,
        TuiLoaderModule,
        TuiInputFileModule,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class AdminModule {}
