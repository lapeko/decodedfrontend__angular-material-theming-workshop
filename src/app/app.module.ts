import {inject, NgModule, PLATFORM_INITIALIZER} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {SharedMaterialModule} from './shared-material/shared-material.module';
import {BannerComponent} from './banner/banner.component';
import {ThemeService} from "./services/theme.service";

@NgModule({
  declarations: [AppComponent, BannerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
  ],
  providers: [
    {provide: PLATFORM_INITIALIZER, useFactory: () => inject(ThemeService).theme$}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
