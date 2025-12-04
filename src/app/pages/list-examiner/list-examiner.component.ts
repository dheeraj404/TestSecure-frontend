import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-list-examiner',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list-examiner.component.html',
  styleUrls: ['./list-examiner.component.css']
})
export class ListExaminerComponent implements OnInit {

  examiners: any = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.ExaminerList().subscribe({
      next: (response) => {
        console.log('Examiner list fetched successfully', response);
        this.examiners = response;
      },
      error: (error) => {
        console.error('Error fetching examiner list', error);
      }
    });
  }

  openDetails(id: number) {
     console.log('Navigating to details for examiner ID:', id);
    this.router.navigate(['/examiner-details', id]);
  }
}
