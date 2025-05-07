import { Component, OnInit } from '@angular/core';
import { FormsModule }       from '@angular/forms';
import { CommonModule }      from '@angular/common';
import { HttpClientModule }  from '@angular/common/http';

import { UserService, User } from './user.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ FormsModule, CommonModule, HttpClientModule ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];

  // Modal
  showModal = false;
  editingUserId: number | null = null;
  editableUser: Partial<User> = {};

  constructor(private userSvc: UserService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.userSvc.getUsers().subscribe(list => this.usuarios = list);
  }

  openEditModal(user: User) {
    this.editingUserId = user.id;
    this.editableUser = { nombre: user.nombre, correo: user.correo, rol: user.rol };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingUserId = null;
    this.editableUser = {};
  }

  saveEdit() {
    // 1) Sacamos en local y comprobamos
    const id = this.editingUserId;
    if (id === null) { return; }
  
    // 2) Lanzamos la petición
    this.userSvc.updateUser(id, this.editableUser)
      .subscribe({
        next: () => {
          // 3) Buscamos el índice y actualizamos
          const idx = this.usuarios.findIndex(u => u.id === id);
          if (idx >= 0) {
            this.usuarios[idx] = {
              id,                                     // id es number puro
              nombre: this.editableUser.nombre!,     // non-null assertion
              correo: this.editableUser.correo!,
              rol: this.editableUser.rol!
            };
          }
          this.closeModal();
        },
        error: () => alert('Error al actualizar usuario')
      });
  }
  
}
