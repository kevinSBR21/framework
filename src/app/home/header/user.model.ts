export interface User {
    nombre: string;
   
    correo: string;
    contrasena: string;
    rol: 'usuario' | 'administrador' | 'abogado';
  }
  