import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isSidebarVisible = false;
  isLargeSidebarVisible = true;

  handleMenuToggle(isOpen: boolean) {
    this.isSidebarVisible = isOpen;
  }

  toggleSidebar() {
    this.isLargeSidebarVisible = !this.isLargeSidebarVisible;    
  }

}
