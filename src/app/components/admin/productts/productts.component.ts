import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-productts',
  imports: [
    FormsModule, RouterModule, CommonModule
  ],
  templateUrl: './productts.component.html',
  styleUrl: './productts.component.css'
})
export class ProducttsComponent {

}
