import {bootstrapApplication} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {importProvidersFrom, inject, PLATFORM_INITIALIZER} from "@angular/core";

import {AppComponent} from "./app/app.component";
import {ThemeService} from "./app/services/theme.service";

bootstrapApplication(AppComponent, {
  providers: [
    {provide: PLATFORM_INITIALIZER, useFactory: () => inject(ThemeService).theme$},
    importProvidersFrom([BrowserAnimationsModule]),
  ],
})
  .catch(err => console.error(err));
