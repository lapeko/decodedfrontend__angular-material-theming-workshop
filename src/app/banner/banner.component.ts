import {Component, HostBinding, Input} from "@angular/core";

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
  type: "info" | "success" | "error" | "none" = "none";

  @HostBinding("class")
  get hostClass() {
    if (this.type === "none") return "";
    return `app-banner-${this.type}`;
  }
}
