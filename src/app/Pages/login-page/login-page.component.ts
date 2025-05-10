import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../../Services/authentication.service'; 

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule, RouterModule, CommonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  user = {
    email: "",
    password: "",
  };

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    // Check if the user is already logged in (optional, to handle reload cases)
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']); // Redirect to home if the user is already logged in
    }
  }

  Login() {
    const { email, password } = this.user;
    const success = this.authService.login(email, password); // Assuming login() method validates credentials

    if (success) {
      // Navigate to home
      this.router.navigate(['/home']);
    } else {
      // Handle login failure
      alert('Invalid email or password');
    }
  }

  validateField(field: NgModel) {
    field.control.markAsTouched(); // Mark the field as touched for validation
  }
}
