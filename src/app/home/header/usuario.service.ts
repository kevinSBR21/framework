import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  contrasena: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_URL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  registrar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.API_URL}/usuarios`, usuario);
  }

  obtenerTodos(): Observable<Usuario[]> {
    // Para obtener sin contraseñas
    return this.http.get<Usuario[]>(`${this.API_URL}/usuarios`);
  }

  obtenerParaLogin(): Observable<Usuario[]> {
    // Para login (con contraseñas)
    return this.http.get<Usuario[]>(`${this.API_URL}/login`);
  }
}
