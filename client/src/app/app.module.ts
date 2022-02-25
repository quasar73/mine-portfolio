import { AuthenticationModule } from './shared/services/auth/authentication.module';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    TuiRootModule,
    TuiNotificationsModule,
    TUI_SANITIZER,
    TuiButtonModule,
    TuiSvgModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiLinkModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule,
    TuiDialogModule,
} from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {
    TuiBreadcrumbsModule,
    TuiCarouselModule,
    TuiCheckboxLabeledModule,
    TuiInputFileModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiIslandModule,
    TuiLazyLoadingModule,
    TuiMarkerIconModule,
    TuiPaginationModule,
    TuiProgressModule,
    TuiStepperModule,
    TuiTextAreaModule,
} from '@taiga-ui/kit';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { of } from 'rxjs';

import { AboutMeComponent } from './components/home-layout/home-content/about-me/about-me.component';
import { HomePageBlockComponent } from './components/home-layout/home-content/home-page-block/home-page-block.component';
import { ContactMeComponent } from './components/home-layout/home-content/contact-me/contact-me.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';
import { BaseLayoutHeaderComponent } from './components/base-layout/base-layout-header/base-layout-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WorkCardComponent } from './components/portfolio-page/work-card/work-card.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { BuildingPageComponent } from './components/building-page/building-page.component';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { HomeHeaderComponent } from './components/home-layout/home-header/home-header.component';
import { HomeContentComponent } from './components/home-layout/home-content/home-content.component';
import { FeaturedWorkComponent } from './components/home-layout/home-content/featured-work/featured-work.component';
import { AddWorkDialogComponent } from './components/admin-page/works-list/add-work-dialog/add-work-dialog.component';
import { AddWorkDialogHeaderComponent } from './components/admin-page/works-list/add-work-dialog/add-work-dialog-header/add-work-dialog-header.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeLayoutComponent,
        HomeHeaderComponent,
        HomeContentComponent,
        FeaturedWorkComponent,
        AboutMeComponent,
        HomePageBlockComponent,
        ContactMeComponent,
        BaseLayoutComponent,
        PortfolioPageComponent,
        BaseLayoutHeaderComponent,
        FooterComponent,
        WorkCardComponent,
        AuthPageComponent,
        BuildingPageComponent,
        AddWorkDialogComponent,
        AddWorkDialogHeaderComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiStepperModule,
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
        TuiInputFileModule,
        TuiInputPasswordModule,
        TuiTextfieldControllerModule,
        TuiBreadcrumbsModule,
        TuiLazyLoadingModule,
        TuiLoaderModule,
        TuiIslandModule,
        TuiCheckboxLabeledModule,
        TuiTextAreaModule,
        TuiProgressModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthenticationModule,
        FormsModule,
        RecaptchaModule,
    ],
    providers: [
        { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
        { provide: TUI_LANGUAGE, useValue: of(TUI_RUSSIAN_LANGUAGE) },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
