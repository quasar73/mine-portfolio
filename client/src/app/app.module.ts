import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    TuiRootModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TUI_SANITIZER,
    TuiButtonModule,
    TuiSvgModule,
    TuiTooltipModule,
    TuiHintModule,
} from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { HomeHeaderComponent } from './components/home-layout/home-header/home-header.component';
import { HomeContentComponent } from './components/home-layout/home-content/home-content.component';
import { FeaturedWorkComponent } from './components/home-layout/home-content/featured-work/featured-work.component';
import { TuiCarouselModule, TuiPaginationModule } from '@taiga-ui/kit';
import { AboutMeComponent } from './components/home-layout/home-content/about-me/about-me.component';
import { HomePageBlockComponent } from './components/home-layout/home-content/home-page-block/home-page-block.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeLayoutComponent,
        HomeHeaderComponent,
        HomeContentComponent,
        FeaturedWorkComponent,
        AboutMeComponent,
        HomePageBlockComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TuiRootModule,
        BrowserAnimationsModule,
        TuiDialogModule,
        TuiNotificationsModule,
        TuiButtonModule,
        TuiCarouselModule,
        TuiPaginationModule,
        TuiSvgModule,
        TuiTooltipModule,
        TuiHintModule,
    ],
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
    bootstrap: [AppComponent],
})
export class AppModule {}
