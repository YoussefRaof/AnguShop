import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../../Services/authentication.service';


@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule, RouterModule, CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
constructor(public auth: AuthenticationService) {}
}
