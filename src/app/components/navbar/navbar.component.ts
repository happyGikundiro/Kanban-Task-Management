import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logoSrc: string = '';
  isMenuOpen: boolean = false;
  @Output() menuToggle = new EventEmitter<boolean>();

  constructor(private themeService: ThemeService) {
    this.updateLogo();
  }

  updateLogo(): void {
    this.logoSrc = this.themeService.getLogoPath();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle.emit(this.isMenuOpen); 
  }
}