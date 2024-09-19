import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy{
  logoSrc: string = '';
  isMenuOpen: boolean = false;
  @Output() menuToggle = new EventEmitter<boolean>();
  themeSubscription!: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService.getDarkModeStatus().subscribe(() => {
      this.updateLogo();
    });
    this.updateLogo();
  }

  updateLogo(): void {
    this.logoSrc = this.themeService.getLogoPath();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle.emit(this.isMenuOpen); 
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}