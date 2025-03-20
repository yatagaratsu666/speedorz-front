import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service'; // Servicio de autenticación
import { CommonModule } from '@angular/common'; // Módulo común de Angular
import { FormsModule } from '@angular/forms'; // Módulo para trabajar con formularios y ngModel
import { HttpClientModule } from '@angular/common/http'; // Módulo para manejar solicitudes HTTP

/**
 * @class LoginComponentUsers
 * @description 
 * Componente de inicio de sesión para usuarios administradores.
 */
@Component({
  selector: 'app-login', // Selector del componente
  standalone: true, // Indica que este componente es independiente
  imports: [CommonModule, FormsModule, HttpClientModule], // Importación de módulos necesarios
  templateUrl: './app-login.component.html', // Ruta al archivo HTML
  styleUrls: ['./app-login.component.css'] // Ruta al archivo de estilos CSS
})
export class LoginComponentUsers {

  /**
   * Propiedad que almacena el nombre de usuario.
   * @type {string}
   */
  username: string = '';

  /**
   * Propiedad que almacena la contraseña del usuario.
   * @type {string}
   */
  password: string = '';

  /**
   * @constructor
   * @param {LoginServiceService} loginService - Servicio para autenticar al usuario.
   * @param {Router} router - Servicio de enrutamiento para redirigir después del login.
   */
  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  /**
   * @method onSubmit
   * @description 
   * Método que se ejecuta cuando el usuario envía el formulario.
   * Llama al servicio de autenticación y redirige al usuario si es exitoso.
   * @returns {void}
   */
  onSubmit(): void {
    this.loginService.loginAdminUsuarios(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/usuarios/gestion']); // Redirige a la gestión de usuarios
      },
      error: (error) => {
        console.error('Login fallido:', error);
        alert('Usuario o contraseña incorrectos'); // Muestra un mensaje de error
      }
    });
  }
}