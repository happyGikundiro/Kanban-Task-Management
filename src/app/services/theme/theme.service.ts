import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeEnabled: BehaviorSubject<boolean>;

  constructor() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.darkModeEnabled = new BehaviorSubject<boolean>(isDarkMode);
    this.initializeDarkMode();
  }

  private initializeDarkMode(): void {
    const htmlElement = document.documentElement;
    if (this.darkModeEnabled.value) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }

  toggleDarkMode(): void {
    const htmlElement = document.documentElement;
    const isDarkMode = !this.darkModeEnabled.value;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
    this.darkModeEnabled.next(isDarkMode);
  }

  getLogoPath(): string {
    return this.darkModeEnabled.value ? '/assets/Images/logo-light.svg' : '/assets/Images/logo-dark.svg';
  }

  getDarkModeStatus(): Observable<boolean> {
    return this.darkModeEnabled.asObservable();
  }

  isDarkMode(): boolean {
    return this.darkModeEnabled.value;
  }
}
