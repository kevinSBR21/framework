import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: any = null;
  modoEdicion = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const data = sessionStorage.getItem('usuarioActivo');
    if (data) {
      this.usuario = JSON.parse(data);
    }
  }

  activarEdicion() {
    this.modoEdicion = true;
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.ngOnInit(); // Restaurar los datos desde sessionStorage
  }

  guardarCambios() {
    this.http.put(`http://localhost:5000/usuarios/${this.usuario.id}`, this.usuario).subscribe({
      next: res => {
        alert('Datos actualizados correctamente');
        sessionStorage.setItem('usuarioActivo', JSON.stringify(this.usuario));
        this.modoEdicion = false;
      },
      error: err => {
        alert('Error al actualizar usuario: ' + err.error?.mensaje || err.message);
      }
    });
  }
}
