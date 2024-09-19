import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  logoSrc: string = '';
  modeIconSrc: string = '';
  isMenuOpen: boolean = false;
  themeSubscription!: Subscription;
  
  @Input() isSidebarVisible = false;
  @Input() isLargeSidebarVisible = true;
  @Output() hideSidebar = new EventEmitter<void>();

  constructor(private themeService: ThemeService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.updateLogoAndIcon();
    this.themeSubscription = this.themeService.getDarkModeStatus().subscribe((isDarkMode) => {
      this.updateLogoAndIcon(isDarkMode);
    });
  }

  updateLogoAndIcon(isDarkMode: boolean = this.themeService.isDarkMode()): void {
    this.logoSrc = this.themeService.getLogoPath();
    this.modeIconSrc = isDarkMode ? '/assets/Images/dark-toggle.svg' : '/assets/Images/light-toggle.svg';
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  toggleSidebar(): void {
    this.hideSidebar.emit();
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  openAddBoardModal(): void {
    console.log("clicked")
    const taskData = {
      type: 'addBoard',
      boardId: 1, // or pass the current board ID
    };
    this.modalService.openModal(taskData);
  }
}


