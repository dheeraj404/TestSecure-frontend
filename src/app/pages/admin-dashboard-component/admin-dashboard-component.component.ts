import { Component } from '@angular/core';
import { ListExaminerComponent } from '../list-examiner/list-examiner.component';
import { CreateExaminerComponent } from '../create-examiner/create-examiner.component';
import{ UploadPaperComponent } from '../upload-paper/upload-paper.component';
import { NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-admin-dashboard-component',
  standalone: true,
  imports: [ListExaminerComponent,CreateExaminerComponent,UploadPaperComponent,NgIf],
  templateUrl: './admin-dashboard-component.component.html',
  styleUrl: './admin-dashboard-component.component.css'
})
export class AdminDashboardComponentComponent {
  constructor(private apiService: ApiService) {}
  activeTab: string = 'list'; // default tab
  menuOpen: boolean = false;
  setTab(tab: string) {
    this.activeTab = tab;
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  logout() {
this.apiService.logout();
  }
}
