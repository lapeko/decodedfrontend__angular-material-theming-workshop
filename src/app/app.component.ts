import {Component} from '@angular/core';

import {ThemeName, ThemeService} from "./services/theme.service";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {BannerComponent} from "./banner/banner.component";
import {MatInputModule} from "@angular/material/input";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BannerComponent,
    MatInputModule,
    MatSelectModule,
    AsyncPipe,
    MatCardModule,
    NgIf,
  ]
})
export class AppComponent {
  constructor(public themeService: ThemeService) {
  }

  get localStorageTheme(): ThemeName | null {
    return localStorage.getItem('theme') as ThemeName
  }

  changeTheme($event: ThemeName) {
    this.themeService.changeTheme($event)
  }
}
