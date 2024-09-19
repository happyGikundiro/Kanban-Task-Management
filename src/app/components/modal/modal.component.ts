// modal.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  isModalOpen!: Observable<boolean>;
  modalData$!: Observable<any>;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.isModalOpen = this.modalService.getModalState();
    this.modalData$ = this.modalService.getModalData();
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('bg-black')) {
      this.closeModal();
    }
  }

}
