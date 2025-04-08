import { Component, OnInit } from '@angular/core';
import { User } from '../../../home/header/user.model'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  imports:[FormsModule,CommonModule],
  standalone: true
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];

  ngOnInit(): void {
    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  }
}
