import {Component} from '@angular/core';

import {ThemeName, ThemeService} from "./services/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public themeService: ThemeService) {
  }

  changeTheme($event: ThemeName) {
    this.themeService.changeTheme($event)
  }
}
