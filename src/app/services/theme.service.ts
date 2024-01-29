import {Injectable} from "@angular/core";
import {fromEvent, map, shareReplay, startWith, tap} from "rxjs";

type ThemeName = "light" | "dark";
type ThemeFileName = `/${ThemeName}-theme.css`;

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  #media = matchMedia("(prefers-color-scheme: light)");
  theme$ = fromEvent<MediaQueryList>(this.#media, "change").pipe(
    startWith(this.#media),
    map(resolveTheme),
    tap(loadTheme),
    shareReplay(),
  )
}

const resolveTheme = (media: MediaQueryList): ThemeName => media.matches ? "light" : "dark";
const loadTheme = (theme: ThemeName): void => {
  getStyleLinkElement().setAttribute("href", getThemeFileName(theme));
};
const getStyleLinkElement = (): HTMLLinkElement => {
  const existLink = document.head.querySelector("link#app-theme") as HTMLLinkElement;
  if (existLink) return existLink;

  const link = document.createElement("link");
  link.setAttribute("id", "app-theme");
  link.setAttribute("rel", "stylesheet");
  document.head.querySelector("link[rel=stylesheet]:last-of-type")?.after(link);

  return link;
};
const getThemeFileName = (theme: ThemeName): ThemeFileName => theme === "light"
  ? "/light-theme.css"
  : "/dark-theme.css";
