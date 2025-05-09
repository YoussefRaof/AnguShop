import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile = {
    username: 'KIRA',
    firstName: 'Ahmed',
    lastName: 'Mohamed',
    location: 'Cairo, Egypt',
    email: 'devahmedmohamed@outlook.com',
    phone: '0115424913',
    birthday: '16/9/2000'
  };

  saveChanges() {
    console.log('Profile updated:', this.profile);

    Swal.fire({
      title: 'Success!',
      text: 'Your profile has been successfully updated!',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }
}
