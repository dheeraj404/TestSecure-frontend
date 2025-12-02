import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-create-examiner',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './create-examiner.component.html',
  styleUrl: './create-examiner.component.css'
})
export class CreateExaminerComponent {
  constructor(private apiService: ApiService) {}
Examinercreated=false;
ExminerName='';
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const examinerData = {
      name: form.value.name,
      email: form.value.email,
      subject: form.value.subject,
      password: form.value.password
    };
    this.apiService.CreateExaminer(examinerData).subscribe({
      next: (response) => {
        console.log('Examiner created successfully', response);
    
        this.ExminerName=response.name;
        alert(`Examiner ${response.name} created successfully`);
        this.Examinercreated=true;
      },
      error: (error) => {
        alert('Error creating examiner');
        console.error('Error creating examiner', error);
      }
    });
    form.reset();

  }
}
