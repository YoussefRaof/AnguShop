import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule, RouterModule
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


  @Output() myEvent = new EventEmitter

  Login() {
    
    this.router.navigate(['/home']);
  }
}
