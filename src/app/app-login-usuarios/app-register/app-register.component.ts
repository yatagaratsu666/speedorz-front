import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../domain/usuario.model';
import { FormsModule } from '@angular/forms';

/**
 * @class RegisterComponentUsers
 * @description 
 * Componente para registrar un nuevo usuario.
 */
@Component({
  selector: 'app-app-register', // Selector del componente
  imports: [CommonModule, RouterModule, FormsModule], // Importación de módulos necesarios
  templateUrl: './app-register.component.html', // Ruta al archivo HTML
  styleUrls: ['./app-register.component.css'] // Ruta al archivo de estilos CSS
})
export class RegisterComponentUsers {

  /**
   * @property usuario
   * @description 
   * Objeto que almacena los datos del usuario a registrar.
   * @type {Usuario}
   */
  usuario: Usuario = {
    idUsuario: 0,
    nombreCompleto: '',
    nombreUsuario: '',
    contrasena: '',
    cedula: '',
    direccion: '',
    telefono: '',
    rol: 'RECEPCION', // Rol por defecto
    estado: 'ACTIVO' // Estado por defecto
  };

  /**
   * @constructor
   * @param {UsuariosService} usuariosService - Servicio para gestionar usuarios.
   * @param {Router} router - Servicio de enrutamiento para redirigir tras el registro.
   */
  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  /**
   * @method onSubmit
   * @description 
   * Método que se ejecuta al enviar el formulario.
   * Llama al servicio para registrar un usuario y maneja la respuesta.
   * @returns {void}
   */
  onSubmit(): void {
    this.usuariosService.crearUsuario(this.usuario).subscribe({
      next: () => {
        console.log('Usuario creado correctamente');
        this.router.navigate(['/usuarios/gestion']); // Redirige a la página de gestión
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        alert('Error al crear usuario. Inténtalo de nuevo.');
      }
    });
  }
}