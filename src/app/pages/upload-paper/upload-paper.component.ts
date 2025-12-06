// upload-paper.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-upload-paper',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './upload-paper.component.html',
  styleUrl: './upload-paper.component.css'
})
export class UploadPaperComponent implements OnInit {
  title = '';
  examDate = '';
  examTime = '';        // will store as "HH:mm"
  examinerId: number | null = null;
  file: File | null = null;
  examiners: any[] = [];
  errorMessage: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.ExaminerList().subscribe({
      next: (response) => {
        // Remove duplicates by examiner ID only
        this.examiners = response.filter(
          (ex: any, index: number, self: any[]) =>
            index === self.findIndex(e => e.id === ex.id)
        );
      },
      error: (error) => {
        console.error('Error fetching examiner list', error);
      }
    });
  }
  onFileChange(event: any) {
    this.file = event.target.files?.[0] ?? null;
  }

  /**
   * Called from <input type="time"> change event.
   * Browser may return "14:30" or "2:30 PM" depending on platform/locale.
   * Normalize and store as "HH:mm" (24-hour).
   */
  onTimeChange(event: any) {
    const raw = event.target.value?.toString() ?? '';
    this.examTime = this._to24Hour(raw);
  }

  /**
   * Helper: convert various time formats to "HH:mm".
   * Handles:
   *  - "14:30" -> "14:30"
   *  - "2:30 PM" / "02:30 PM" -> "14:30"
   *  - "2:30am" (case insensitive) -> "02:30"
   *  - "2:30" -> "02:30" (assumes 24-hour if >12 else keeps two-digit hour)
   */
  private _to24Hour(input: string): string {
    if (!input) return '';

    const s = input.trim();

    // If contains AM/PM (case-insensitive)
    const ampmMatch = s.match(/(am|pm)$/i);
    if (ampmMatch) {
      // e.g. "2:30 PM" or "02:30pm"
      const parts = s.replace(/(am|pm)$/i, '').trim().split(':');
      let hh = parseInt(parts[0], 10);
      const mm = (parts[1] ?? '00').padStart(2, '0');

      const mod = ampmMatch[0].toUpperCase();
      if (mod === 'PM' && hh !== 12) hh = hh + 12;
      if (mod === 'AM' && hh === 12) hh = 0;

      const hhStr = hh.toString().padStart(2, '0');
      return `${hhStr}:${mm}`;
    }

    // If already in HH:MM (24-hour) format or H:MM
    const colonMatch = s.match(/^(\d{1,2}):(\d{2})$/);
    if (colonMatch) {
      let hh = parseInt(colonMatch[1], 10);
      const mm = colonMatch[2];
      // normalize hour to two digits; if hour < 24 it's fine
      hh = Math.max(0, Math.min(23, hh));
      return `${hh.toString().padStart(2, '0')}:${mm}`;
    }

    // Fallback: return as-is (but best effort)
    return s;
  }

  upload() {
    if (!this.file || !this.examinerId || !this.title || !this.examDate || !this.examTime) {
      alert('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('examDate', this.examDate);
    formData.append('examTime', this.examTime); // guaranteed HH:mm by onTimeChange/_to24Hour
    formData.append('examinerId', this.examinerId.toString());
    formData.append('file', this.file);

    this.apiService.uploadPaper(formData).subscribe({
      next: (response) => {
        alert('Exam paper uploaded successfully');
        console.log('Upload response', response);
        // Reset form
        this.title = '';
        this.examDate = '';
        this.examTime = '';
        this.examinerId = null;
        this.file = null;

      },
      error: (error) => {
        if (error.error && error.error.error) {
          this.errorMessage = error.error.error;   // <-- use error.error.error
        } else {
          this.errorMessage = 'Something went wrong while uploading';
        }
      }
    });
  }
}
