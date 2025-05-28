import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface User {
  email: string;
  password: string;
  role?: 'customer' | 'admin';
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

interface TokenPayload {
  email: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly userKey = 'users';
  private readonly tokenKey = 'auth_token';
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    this.initializeCurrentUser();
  }

  private initializeCurrentUser(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        const payload: TokenPayload = JSON.parse(token);
        this.currentUserSubject.next(payload.email);
      } catch {
        this.clearToken();
      }
    }
  }

  // User data management
  private get users(): User[] {
    return JSON.parse(localStorage.getItem(this.userKey) || '[]');
  }

  private set users(users: User[]) {
    localStorage.setItem(this.userKey, JSON.stringify(users));
  }

  // Core authentication methods
  register(userData: { 
    email: string; 
    password: string; 
    role?: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      birthday?: string;
    }
  }, isAdmin: boolean = false): boolean {
    if (this.userExists(userData.email)) {
      return false;
    }

    const newUser: User = {
      email: userData.email,
      password: userData.password,
      role: isAdmin ? 'admin' : 'customer',
      profile: userData.profile || {}
    };

    this.users = [...this.users, newUser];
    return true;
  }

  login(email: string, password: string): boolean {
    if (!email || !password) return false;

    const user = this.users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );

    if (!user) return false;

    this.setToken({
      email: user.email,
      role: user.role
    });

    this.currentUserSubject.next(user.email);
    return true;
  }

  logout(): void {
    this.clearToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Token management
  private setToken(payload: TokenPayload): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(payload));
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Helper methods
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  isAdmin(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;
    
    try {
      const payload: TokenPayload = JSON.parse(token);
      return payload.role === 'admin';
    } catch {
      return false;
    }
  }

  getCurrentUser(): string | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserProfile(): User | null {
    const email = this.currentUserSubject.value;
    return email ? this.users.find(u => u.email === email) || null : null;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  updateUserProfile(profileData: Partial<User['profile']>): boolean {
    const email = this.currentUserSubject.value;
    if (!email) return false;

    const users = this.users;
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) return false;

    users[userIndex].profile = { 
      ...users[userIndex].profile, 
      ...profileData 
    };
    this.users = users;
    return true;
  }

  makeAdmin(email: string): boolean {
    const users = this.users;
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) return false;
    
    users[userIndex].role = 'admin';
    this.users = users;
    return true;
  }

  private userExists(email: string): boolean {
    return this.users.some(user => 
      user.email.toLowerCase() === email.toLowerCase()
    );
  }

deleteUser(email: string): boolean {
  const users = this.getAllUsers();
  const initialLength = users.length;
  
  // Filter out the user to delete
  const updatedUsers = users.filter(user => user.email !== email);
  
  // Save changes using the users setter
  this.users = updatedUsers;
  
  // Return true if a user was actually deleted
  return updatedUsers.length < initialLength;
}
}