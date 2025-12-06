import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-examiner-dashboard',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './examiner-dashboard.component.html',
  styleUrl: './examiner-dashboard.component.css'
})
export class ExaminerDashboardComponent implements OnInit {
  errorMessage: any;

  constructor(private apiService: ApiService) {}
username :any;
  listofPapers: any[] = [];
  showMenu: boolean = false; 
  ngOnInit() {
    this.username = this.apiService.getUsername();
    console.log("Logged in as:", this.username);  
    this.apiService.getPapersForExaminer().subscribe({
      next: (response) => {
        console.log("Papers fetched successfully", response);
        this.listofPapers = response;
      },
      error: (error) => {
        console.error("Error fetching papers", error);
      }
    });
  }

  // ✔ Check if download is allowed
  canDownload(examDate: string, examTime: string): boolean {
    const examDateTime = new Date(`${examDate}T${examTime}`);
    const now = new Date();

    // 30 minutes before exam
    const diff = (examDateTime.getTime() - now.getTime()) / 1000 / 60;

    return diff <= 30 && diff >= 0; 
  }

  // ✔ Call API to download
  downloadPaper(paperId: number) {
    this.apiService.downloadPaper(paperId).subscribe({
      next: (response) => {
        console.log("File downloaded");

        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = "question-paper.pdf";
        a.click();

        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        if (error.error && error.error.error) {
          this.errorMessage = error.error.error;   // backend returns { error: "msg" }
        } else {
          this.errorMessage = "Failed to load papers";
        }
      }
    });
  }
  logout() {
    this.apiService.logout();
    window.location.href = "/login";
  }
}
