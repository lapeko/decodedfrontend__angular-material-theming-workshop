import {bootstrapApplication} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {importProvidersFrom, inject, PLATFORM_INITIALIZER} from "@angular/core";

import {AppComponent} from "./app/app.component";
import {ThemeService} from "./app/services/theme.service";
import {MATERIAL_SANITY_CHECKS} from "@angular/material/core";

bootstrapApplication(AppComponent, {
  providers: [
    {provide: PLATFORM_INITIALIZER, useFactory: () => inject(ThemeService).theme$},
    {provide: MATERIAL_SANITY_CHECKS, useValue: {theme: false}},
    importProvidersFrom([BrowserAnimationsModule]),
  ],
})
  .catch(err => console.error(err));
