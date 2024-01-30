import {Injectable} from "@angular/core";
import {
  fromEvent,
  map,
  merge,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from "rxjs";

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
  #userChangeThemeSubject$ = new Subject<ThemeName>();

  theme$ = merge(
    this.#osThemePreferenceChange$,
    this.#userChangeThemeSubject$,
  ).pipe(
    switchMap(loadTheme),
    shareReplay(),
  );

  changeTheme(theme: ThemeName) {
    this.#userChangeThemeSubject$.next(theme);
  };
}

const resolveTheme = (media: MediaQueryList): ThemeName => media.matches ? "light" : "dark";

const loadTheme = (theme: ThemeName): Observable<ThemeName> => {
  const existLink = document.head.querySelector<HTMLLinkElement>("link#app-theme");
  if (existLink) {
    existLink.setAttribute("href", getThemeFileName(theme));
    return of(theme);
  }

  const link = document.createElement("link");
  link.setAttribute("id", "app-theme");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", `${getThemeFileName(theme)}?ts=${Date.now()}`);
  document.head.querySelector("link[rel=stylesheet]:last-of-type")?.after(link);

  return fromEvent(link, "load", {once: true}).pipe(map(() => theme));
};

const getThemeFileName = (theme: ThemeName): ThemeFileName => theme === "light"
  ? "/light-theme.css"
  : "/dark-theme.css";
