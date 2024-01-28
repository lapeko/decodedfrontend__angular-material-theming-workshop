import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit() {
    this.renderer.addClass(this.document.body, "app-dark-theme");
  }

  onThemeChange({source}: MatSelectChange) {
    if (source.value === "light") {
      this.renderer.removeClass(this.document.body, "app-dark-theme");
      this.renderer.addClass(this.document.body, "app-light-theme");
    } else {
      this.renderer.removeClass(this.document.body, "app-light-theme");
      this.renderer.addClass(this.document.body, "app-dark-theme");
    }
  }
}
