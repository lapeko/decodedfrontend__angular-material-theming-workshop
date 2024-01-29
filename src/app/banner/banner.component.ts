import {Component, HostBinding, Input} from "@angular/core";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  @Input()
  heading: string = "";

  @Input()
  message: string = "";

  @Input()
  type: ThemePalette = "primary";

  @HostBinding("class")
  get hostClass() {
    return `app-banner-${this.type}`;
  }
}
