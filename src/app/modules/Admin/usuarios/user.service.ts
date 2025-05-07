import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private API_URL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/usuarios`);
  }

  updateUser(id: number, data: Partial<User>): Observable<any> {
    return this.http.put(`${this.API_URL}/usuarios/${id}`, data);
  }
}
