import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState = new BehaviorSubject<boolean>(false);
  private modalData = new BehaviorSubject<any>(null);

  constructor() {}

  openModal(data: any): void {
    this.modalData.next(data);
    this.modalState.next(true);
  }

  closeModal(): void {
    this.modalState.next(false);
    this.modalData.next(null);
  }

  getModalState(): Observable<boolean> {
    return this.modalState.asObservable();
  }

  getModalData(): Observable<any> {
    return this.modalData.asObservable();
  }
}
