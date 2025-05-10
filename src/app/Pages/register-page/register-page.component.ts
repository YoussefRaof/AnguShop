import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../Services/authentication.service'; 

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    FormsModule, RouterModule, CommonModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  constructor(private router: Router, private authService: AuthenticationService) { }

  user = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  Register() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const success = this.authService.register({
      email: this.user.email,
      password: this.user.password
    });

    if (success) {
      alert('Registration successful');
      // Automatically log the user in after registration
      this.authService.login(this.user.email, this.user.password);
      this.router.navigate(['/home']);
    } else {
      alert('User already exists');
    }
  }
}
