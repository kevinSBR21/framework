import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UsuarioService, Usuario } from './usuario.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[FormsModule, CommonModule, RouterModule]
})


export class HeaderComponent implements OnInit {
  constructor(private usuarioService: UsuarioService,
    private router: Router
  ) {}

  
  nuevoUsuario: Usuario = {
    nombre: '',
    correo: '',
    contrasena: '',
    rol: 'usuario'
  };

usuarioLogueado: Usuario | null = null;
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
      this.usuarioService.obtenerParaLogin().subscribe(usuarios => {
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
      });
    }
    

    registrarUsuario() {
      this.usuarioService.registrar(this.nuevoUsuario).subscribe({
        next: res => {
          sessionStorage.setItem('usuarioActivo', JSON.stringify(this.nuevoUsuario));
          this.usuarioLogueado = this.nuevoUsuario;
          this.actualizarMenu();
          alert('Usuario registrado correctamente');
          this.cerrarModal();
        },
        error: err => alert('Error al registrar usuario: ' + err.error.mensaje)
      });
    }

  
    actualizarMenu() {
      if (!this.usuarioLogueado) return;
    
      switch (this.usuarioLogueado.rol) {
        case 'usuario':
      this.menuItems = [
        { texto: 'Asesorías', ruta: '/asesorias' },
        { texto: 'Profesionales', ruta: '/profesional' },
        { texto: 'Contáctanos', ruta: '/contactanos' },
        
      ];
      break;

    case 'administrador':
      this.menuItems = [
        { texto: 'Solicitudes', ruta: '/solicitudes' },
        { texto: 'Noticias', ruta: '/noticias' },
        { texto: 'Profesionales', ruta: '/profesionales' },
        { texto: 'Usuarios', ruta: '/usuarios' },
        
      ];
      break;

    case 'abogado':
      this.menuItems = [
        { texto: 'Mi consultorio', ruta: '/mi consultorio' },
        { texto: 'Solicitudes', ruta: '/solicitud' },
      
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
        console.log('Usuario logueado:', this.usuarioLogueado); // <-- AQUI
        this.actualizarMenu();
      }
      
    }
    
  
    cerrarSesion() {
      sessionStorage.removeItem('usuarioActivo');
      this.usuarioLogueado = null;
      this.menuItems = [];
      this.router.navigate(['/']); // Redirige al inicio
    }
 

  

 
}
