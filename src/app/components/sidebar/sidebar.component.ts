import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  logoSrc: string = '';
  modeIconSrc: string = '';
  isMenuOpen: boolean = false;
  @Input() isSidebarVisible = false;
  @Input() isLargeSidebarVisible= true;
  @Output() hideSidebar = new EventEmitter<void>(); 

  constructor(private themeService: ThemeService) {
    this.updateLogoAndIcon();
  }

  updateLogoAndIcon(): void {
    this.logoSrc = this.themeService.getLogoPath(); 
    this.modeIconSrc = this.themeService.isDarkMode() ? '/assets/Images/dark-toggle.svg' : '/assets/Images/light-toggle.svg';
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
    this.updateLogoAndIcon();
  }

  toggleSidebar() {
    this.hideSidebar.emit();
  }
  
}

