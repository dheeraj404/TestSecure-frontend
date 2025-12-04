import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-examiner',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './create-examiner.component.html',
  styleUrl: './create-examiner.component.css'
})
export class CreateExaminerComponent {

  Examinercreated = false;
  ExminerName = '';
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  onSubmit(form: NgForm) {

    if (form.invalid) {
      this.errorMessage = "All fields are required!";
      return;
    }

    this.errorMessage = "";

    const examinerData = {
      name: form.value.name,
      email: form.value.email,
      subject: form.value.subject,
      password: form.value.password
    };

    this.apiService.CreateExaminer(examinerData).subscribe({
      next: (response) => {
        this.ExminerName = response.name;
        this.Examinercreated = true;
        form.reset();
      },
      error: (error) => {
     this.errorMessage = error.error?.error || "Failed to create examiner. Please try again.";
      }
    });
  }
}
