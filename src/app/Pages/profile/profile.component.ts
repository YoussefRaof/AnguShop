import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../Services/authentication.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile = {
    username: '',
    firstName: '',
    lastName: '',
    location: '',
    email: '',
    phone: '',
    birthday: ''
  };
  
  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUserProfile();

    if (user) {
      this.profile.email = user.email;
      this.profile.username = user.profile?.username || user.email.split('@')[0];
      this.profile.firstName = user.profile?.firstName || '';
      this.profile.lastName = user.profile?.lastName || '';
      this.profile.location = user.profile?.location || '';
      this.profile.phone = user.profile?.phone || '';
      this.profile.birthday = user.profile?.birthday || '';
    }
  }

  saveChanges() {
    this.authService.updateUserProfile({
      username: this.profile.username,
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      location: this.profile.location,
      phone: this.profile.phone,
      birthday: this.profile.birthday
    });

    Swal.fire({
      title: 'Success!',
      text: 'Your profile has been successfully updated!',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
