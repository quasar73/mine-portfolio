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
    TuiProgressModule,
    TuiStepperModule,
    TuiTabsModule,
    TuiTextAreaModule,
    TuiToggleModule,
} from '@taiga-ui/kit';
import {
    TuiDialogModule,
    TuiNotificationsModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiLinkModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule,
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { WorksAccordionComponent } from '../components/admin-page/works-list/works-accordion/works-accordion.component';
import { WorksListItemComponent } from '../components/admin-page/works-list/works-accordion/works-list-item/works-list-item.component';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { MessagesListComponent } from '../components/admin-page/messages-list/messages-list.component';
import { WorksListComponent } from '../components/admin-page/works-list/works-list.component';
import { AddWorkDialogComponent } from '../components/admin-page/works-list/add-work-dialog/add-work-dialog.component';
import { AddWorkDialogHeaderComponent } from '../components/admin-page/works-list/add-work-dialog/add-work-dialog-header/add-work-dialog-header.component';

@NgModule({
    declarations: [
        WorksAccordionComponent,
        WorksListItemComponent,
        AdminPageComponent,
        MessagesListComponent,
        WorksListComponent,
        AddWorkDialogComponent,
        AddWorkDialogHeaderComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        TuiDialogModule,
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
        TuiStepperModule,
        TuiInputFileModule,
        TuiProgressModule,
        TuiCheckboxLabeledModule,
        TuiLazyLoadingModule,
        TuiLoaderModule,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class AdminModule {}
