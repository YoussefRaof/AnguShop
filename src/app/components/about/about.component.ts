import { Component, AfterViewInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; 
import * as L from 'leaflet';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class AboutComponent implements AfterViewInit {
  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    location: ''
  };

  responseMessage: string = '';
  responseMessageType: string = ''; 

  map: any;
  marker: any;

  constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  initMap(): void {
    this.ngZone.runOutsideAngular(() => {
      this.map = L.map('map').setView([30.044453131525962, 31.23577937667665], 6);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      const icon = L.icon({
        iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      this.marker = L.marker([30.0444, 31.2357], { icon: icon, draggable: true }).addTo(this.map);
      this.marker.on('dragend', (e: any) => {
        const lat = e.target.getLatLng().lat.toFixed(4);
        const lng = e.target.getLatLng().lng.toFixed(4);
        this.formData.location = `${lat}, ${lng}`;
      });

      setTimeout(() => {
        this.map.invalidateSize();
      }, 100);
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted:', this.formData);

      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.formData = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          location: ''
        };
        form.resetForm();
        this.responseMessage = '';
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out the form correctly.',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        this.responseMessage = '';
      });
    }
  }
}
