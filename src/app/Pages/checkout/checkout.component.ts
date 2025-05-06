import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  ngAfterViewInit(): void {
    const forms = document.querySelectorAll<HTMLFormElement>('.needs-validation');

    forms.forEach((form) => {
      form.addEventListener('submit', (event: Event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      });
    });
}}
