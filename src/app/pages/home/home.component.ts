import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @Input() isLargeSidebarVisible!: boolean ;

  constructor(private modalService: ModalService) {}

  openAddColumnModal(){
    console.log("clicked")
    const taskData = {
      type: 'addColumn',
      boardId: 1,
    };
    this.modalService.openModal(taskData);
  }

  openTaskDetails(task: any): void {
    const taskData = {
      type: 'taskDetails',
      task: task,
    };
    this.modalService.openModal(taskData);
  }
  

}
