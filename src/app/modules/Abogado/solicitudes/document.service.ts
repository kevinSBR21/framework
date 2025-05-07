import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Documento {
  id: number;
  filename: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  fecha: string;
  usuario_id: number;
  usuario_nombre: string;
  download_url: string;
}

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private API_URL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.API_URL}/documentos`);
  }

  updateEstado(id: number, estado: string) {
    return this.http.put(`${this.API_URL}/documentos/${id}`, { estado });
  }
}
