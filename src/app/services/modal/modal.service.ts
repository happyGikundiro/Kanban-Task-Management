import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalTypeSubject = new BehaviorSubject<string | null>(null);
  modalType$ = this.modalTypeSubject.asObservable();

  private isModalOpen = new BehaviorSubject<boolean>(false);
  isModalOpen$ = this.isModalOpen.asObservable();

  openModal(type: string): void {
    this.modalTypeSubject.next(type);
    this.isModalOpen.next(true); 
  }

  closeModal(): void {
    this.modalTypeSubject.next(null);
    this.isModalOpen.next(false);
  }
}
