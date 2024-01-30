import {Injectable} from "@angular/core";
import {fromEvent, map, merge, shareReplay, startWith, Subject, tap} from "rxjs";

export type ThemeName = "light" | "dark";
type ThemeFileName = `/${ThemeName}-theme.css`;

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  #osThemePreference = matchMedia("(prefers-color-scheme: light)");
  #osThemePreferenceChange$ = fromEvent<MediaQueryList>(this.#osThemePreference, "change").pipe(
    startWith(this.#osThemePreference),
    map(resolveTheme),
  );
  #changeThemeSubject$ = new Subject<ThemeName>();

  theme$ = merge(
    this.#osThemePreferenceChange$,
    this.#changeThemeSubject$,
  ).pipe(
    tap(loadTheme),
    shareReplay(),
  );

  changeTheme = (theme: ThemeName) => this.#changeThemeSubject$.next(theme);
}

const resolveTheme = (media: MediaQueryList): ThemeName => media.matches ? "light" : "dark";
const loadTheme = (theme: ThemeName): void => {
  getStyleLinkElement().setAttribute("href", getThemeFileName(theme));
};
const getStyleLinkElement = (): HTMLLinkElement => {
  const existLink = document.head.querySelector<HTMLLinkElement>("link#app-theme");
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
