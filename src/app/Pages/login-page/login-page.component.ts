import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../../Services/authentication.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  user = {
    email: "",
    password: ""
  };

  showPassword = false;
  rememberMe = false;
  isLoading = false;
  errorMessage = "";

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    
    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.user.email = rememberedEmail;
      this.rememberMe = true;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  validateField(field: NgModel) {
    field.control.markAsTouched();
  }

  async Login() {
    this.isLoading = true;
    this.errorMessage = "";

    try {
      // Simulate API delay (remove in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = this.authService.login(this.user.email, this.user.password);

      if (success) {
        // Handle remember me functionality
        if (this.rememberMe) {
          localStorage.setItem('rememberedEmail', this.user.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = "Invalid email or password. Please try again.";
      }
    } catch (error) {
      this.errorMessage = "An error occurred during login. Please try again later.";
      console.error('Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}