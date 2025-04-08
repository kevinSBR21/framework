import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[FormsModule, CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {

   nuevoUsuario: User = {
      nombre: '',
      apellido: '',
      correo: '',
      contrasena: '',
      rol: 'usuario'
    };
  usuarioLogueado: User | null = null;
  menuItems: { texto: string, ruta: string }[] = [];

   modal: 'login' | 'registro' | null = null;
  
    correoLogin: string = '';
  contrasenaLogin: string = '';
  

  
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
        this.usuarioLogueado = usuarioEncontrado; 
        this.actualizarMenu(); 
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
    this.actualizarMenu();
    alert('Usuario registrado correctamente');
    this.cerrarModal();
  }
  
    actualizarMenu() {
      if (!this.usuarioLogueado) return;
    
      switch (this.usuarioLogueado.rol) {
        case 'usuario':
      this.menuItems = [
        { texto: 'Asesorías', ruta: '/asesorias' },
        { texto: 'Profesionales', ruta: '/profesional' },
        { texto: 'Contáctanos', ruta: '/contactanos' }
      ];
      break;

    case 'administrador':
      this.menuItems = [
        { texto: 'Solicitudes', ruta: '/solicitudes' },
        { texto: 'Noticias', ruta: '/noticias' },
        { texto: 'Profesionales', ruta: '/profesionales' },
        { texto: 'Usuarios', ruta: '/usuarios' }
      ];
      break;

    case 'abogado':
      this.menuItems = [
        { texto: 'Mi consultorio', ruta: '/mi consultorio' },
        { texto: 'Solicitudes', ruta: '/solicitud' }
      ];
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
