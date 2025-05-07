import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent {
  private API_URL = 'http://127.0.0.1:5000';
  showModal = false;
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.selectedFile = null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  upload() {
    if (!this.selectedFile) {
      return alert('Selecciona primero un archivo');
    }
  
    // 1) Leer el JSON bajo la clave "usuarioActivo"
    const usuarioJSON = sessionStorage.getItem('usuarioActivo');
    if (!usuarioJSON) {
      return alert('Usuario no identificado');
    }
    const usuario = JSON.parse(usuarioJSON);
    const userId = usuario.id;
  
    // 2) Preparar FormData
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('usuario_id', String(userId));
  
    // 3) Enviar al backend
    this.http.post(`${this.API_URL}/documentos`, formData)
      .subscribe({
        next: () => {
          alert('¡Documento enviado con éxito!');
          this.closeModal();
        },
        error: err => {
          console.error(err);
          alert('Error al enviar el documento');
        }
      });
  }
  
}
