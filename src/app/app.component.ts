import {Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ThemeService} from "./services/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly themeAnchor = this.document.getElementById("app-theme");

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public themeService: ThemeService,
  ) {
  }
}
