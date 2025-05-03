import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule, RouterModule, CommonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private router: Router) { }

  user = {
    email: "",
    password: "",
  };


  // @Output() myEvent = new EventEmitter

  Login() {
    
    this.router.navigate(['/home']);
  }

  validateField(field: NgModel) {
    field.control.markAsTouched();
  }
}
