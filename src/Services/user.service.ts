import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // Simulating fetching user data from localStorage (replace with actual API if needed)
  getUserData(email: string): Observable<any> {
    // Get user data from localStorage (replace with actual API if needed)
    const user = JSON.parse(localStorage.getItem(email) || '{}');
    return of(user);
  }

  // Simulating updating user data (replace with actual API if needed)
  updateUserData(updatedData: any): Observable<any> {
    // Update user data in localStorage (replace with actual API if needed)
    localStorage.setItem(updatedData.email, JSON.stringify(updatedData));
    return of(updatedData);
  }
}
