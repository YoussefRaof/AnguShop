import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface User {
  email: string;
  password: string;
  profile?: {
    username?: string;
    firstName?: string;
    lastName?: string;
    location?: string;
    phone?: string;
    birthday?: string;
    image?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userKey = 'users';
  private tokenKey = 'token';
  private currentUserSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    const storedUser = localStorage.getItem(this.tokenKey);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser).email);
    }
  }

  register(user: { email: string; password: string }): boolean {
    const users = this.getAllUsers();
    const exists = users.find(u => u.email === user.email);
    if (exists) return false;

    users.push(user); // add user with email & password
    localStorage.setItem(this.userKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return false;

    localStorage.setItem(this.tokenKey, JSON.stringify({ email }));
    this.currentUserSubject.next(email);
    return true;
  }
// 
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): string | null {
    return this.currentUserSubject.value;
  }

  private getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.userKey) || '[]');
  }

  // 🔽 Get full profile
  getCurrentUserProfile(): User | null {
    const email = this.getCurrentUser();
    if (!email) return null;
    const users = this.getAllUsers();
    return users.find(u => u.email === email) || null;
  }

  // 🔽 Update profile and save back to localStorage
  updateUserProfile(profileData: Partial<User['profile']>): void {
    const email = this.getCurrentUser();
    if (!email) return;

    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) return;

    const user = users[userIndex];
    user.profile = { ...user.profile, ...profileData }; // merge old + new
    users[userIndex] = user;

    localStorage.setItem(this.userKey, JSON.stringify(users));
  }
}
