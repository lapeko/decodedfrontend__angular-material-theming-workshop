import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly themeAnchor = this.document.getElementById("app-theme");

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {
  }

  onThemeChange({source}: MatSelectChange) {
    this.renderer.setAttribute(
      this.themeAnchor,
      "href",
      source.value === "light" ? "light-theme.css" : "dark-theme.css",
    );
  }
}
