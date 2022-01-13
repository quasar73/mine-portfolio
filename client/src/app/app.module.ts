import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    TuiRootModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TUI_SANITIZER,
    TuiButtonModule,
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

@NgModule({
    declarations: [
        AppComponent,
        HomeLayoutComponent,
        HomeHeaderComponent,
        HomeContentComponent,
        FeaturedWorkComponent,
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
    ],
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
    bootstrap: [AppComponent],
})
export class AppModule {}
