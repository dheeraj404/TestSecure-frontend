import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-examiner-details',
  standalone: true,
  imports: [],
  templateUrl: './examiner-details.component.html',
  styleUrl: './examiner-details.component.css'
})
export class ExaminerDetailsComponent {

  examiner: any;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log('Fetching details for examiner ID:', id);
  }
}
