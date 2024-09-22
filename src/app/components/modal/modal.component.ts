import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() isModalOpen!: Observable<boolean>;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

   closeModal(): void {
    this.modalService.closeModal();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('bg-black')) {
      this.closeModal();
    }
  }
}
