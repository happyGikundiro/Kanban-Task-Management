import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeEnabled: boolean = false;

  constructor() {
    this.initializeDarkMode();
  }

  private initializeDarkMode(): void {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const htmlElement = document.documentElement;

    if (isDarkMode) {
      htmlElement.classList.add('dark');
      this.darkModeEnabled = true;
    } else {
      htmlElement.classList.remove('dark');
      this.darkModeEnabled = false;
    }
  }

  toggleDarkMode(): void {
    const htmlElement = document.documentElement;
    if (this.darkModeEnabled) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
      this.darkModeEnabled = false;
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
      this.darkModeEnabled = true;
    }
  }

  isDarkMode(): boolean {
    return this.darkModeEnabled;
  }

  getLogoPath(): string {
    return this.darkModeEnabled ? '/assets/Images/logo-light.svg' : '/assets/Images/logo-dark.svg';
  }
}
