export interface User {
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    rol: 'usuario' | 'administrador' | 'abogado';
  }
  