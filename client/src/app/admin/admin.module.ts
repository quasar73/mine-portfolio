import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    TuiAccordionModule,
    TuiCarouselModule,
    TuiCheckboxLabeledModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiLazyLoadingModule,
    TuiMarkerIconModule,
    TuiPaginationModule,
    TuiProgressModule,
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

@NgModule({
    declarations: [
        WorksAccordionComponent,
        WorksListItemComponent,
        AdminPageComponent,
        MessagesListComponent,
        WorksListComponent,
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
        TuiProgressModule,
        TuiCheckboxLabeledModule,
        TuiLazyLoadingModule,
        TuiLoaderModule,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class AdminModule {}
