import { Component, NgModule } from '@angular/core';
import { User } from './user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports:[FormsModule, CommonModule]

  
})


export class IndexComponent {
  nuevoUsuario: User = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    rol: 'usuario'
  };
  modal: 'login' | 'registro' | null = null;

  correoLogin: string = '';
contrasenaLogin: string = '';

usuarioLogueado: User | null = null;
menuItems: string[] = [];

  abrirModal(tipo: 'login' | 'registro') {
    this.modal = tipo;
  }
  
  cerrarModal() {
    this.modal = null;
  }

  iniciarSesion() {
    const usuarios: User[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find(
      u => u.correo === this.correoLogin && u.contrasena === this.contrasenaLogin
    );
  
    if (usuarioEncontrado) {
      sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));
      this.usuarioLogueado = usuarioEncontrado; // <--- Esto faltaba
      this.actualizarMenu(); // <--- Esto también
      alert(`Bienvenido, ${usuarioEncontrado.nombre}`);
      this.cerrarModal();
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }
  
 registrarUsuario() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  usuarios.push(this.nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  sessionStorage.setItem('usuarioActivo', JSON.stringify(this.nuevoUsuario));
  this.usuarioLogueado = this.nuevoUsuario; // <--- Esto faltaba
  this.actualizarMenu(); // <--- Esto también
  alert('Usuario registrado correctamente');
  this.cerrarModal();
}

  actualizarMenu() {
    if (!this.usuarioLogueado) return;
  
    switch (this.usuarioLogueado.rol) {
      case 'usuario':
        this.menuItems = ['Profesionales', 'Asesorías', 'Contáctanos'];
        break;
      case 'administrador':
        this.menuItems = ['Profesionales', 'Usuarios', 'Noticias', 'Solicitudes'];
        break;
      case 'abogado':
        this.menuItems = ['Mi Consultorio', 'Solicitudes'];
        break;
      default:
        this.menuItems = [];
    }
  }

  ngOnInit() {
    const usuario = sessionStorage.getItem('usuarioActivo');
    if (usuario) {
      this.usuarioLogueado = JSON.parse(usuario);
      this.actualizarMenu();
    }
  }
  

  cerrarSesion() {
    sessionStorage.removeItem('usuarioActivo');
    this.usuarioLogueado = null;
    this.menuItems = [];
  }
  
}
