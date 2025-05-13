import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../../../Services/complaint.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
  ],
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  complaints: any[] = [];

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.complaints = this.complaintService.getComplaints();
  }

  deleteComplaint(index: number): void {
    if (confirm('Are you sure you want to delete this complaint?')) {
      this.complaints.splice(index, 1);
      this.complaintService.updateComplaints(this.complaints); 
    }
  }
}
