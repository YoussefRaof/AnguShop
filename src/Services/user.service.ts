import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authService: AuthenticationService) {}

  getUserData(email: string): Observable<any> {
    const user = this.authService.getAllUsers().find(u => u.email === email);
    return of(user || {});
  }

  updateUserData(updatedData: any): Observable<any> {
    const users = this.authService.getAllUsers();
    const userIndex = users.findIndex(u => u.email === updatedData.email);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData };
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    return of(updatedData);
  }
}