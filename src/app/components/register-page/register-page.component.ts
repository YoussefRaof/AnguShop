import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-register-page',
  imports: [
    FormsModule, RouterModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  constructor(private router: Router) { }

  user = {
    email: "",
    password: "",
    confirmPassword: ""
  };


  @Output() myEvent = new EventEmitter

  Register() {
    
    this.router.navigate(['/login']);
  }
}
