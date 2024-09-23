import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Observable, Subscription } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';
import { Store } from '@ngrx/store';
import { selectActiveBoard } from '../../store/Tasks/board.selectors';
import { Board } from '../../model/model';

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

  activeBoard$: Observable<Board| undefined> = this.store.select(selectActiveBoard);

  isBoardMenuOpen = false;

  constructor(private themeService: ThemeService, public modalService: ModalService, private store: Store) {}

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

  openAddTaskModal(): void {
    this.modalService.openModal('addTask');
  }

  openBoardmenuModal(): void {
    this.isBoardMenuOpen = !this.isBoardMenuOpen;
  }

  onEditBoardClick() {
    this.modalService.openModal('editBoard');
  }
}