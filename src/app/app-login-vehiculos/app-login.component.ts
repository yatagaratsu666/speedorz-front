import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';

/**
 * @class LoginComponentVehiculos
 * @description 
 * Componente para gestionar el inicio de sesión del administrador de inventario de vehículos.
 * Permite autenticarse con un usuario y contraseña, y redirige a la gestión de vehículos en caso de éxito.
 * @style ./app-login.component.css
 */
@Component({
  selector: 'app-app-login', // Selector del componente
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Módulos necesarios para el componente
  templateUrl: './app-login.component.html', // Ruta del archivo de plantilla HTML
  styleUrls: ['./app-login.component.css'] // Ruta del archivo de estilos CSS
})
export class LoginComponentVehiculos {

  /**
   * Nombre de usuario ingresado por el usuario.
   * @type {string}
   */
  username: string = '';

  /**
   * Contraseña ingresada por el usuario.
   * @type {string}
   */
  password: string = '';

  /**
   * @constructor
   * @param {LoginServiceService} loginService - Servicio de autenticación.
   * @param {Router} router - Servicio de enrutamiento para redireccionar al usuario tras el inicio de sesión.
   */
  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  /**
   * @method onSubmit
   * @description Maneja el evento de envío del formulario de inicio de sesión.  
   * Llama al servicio de autenticación y, si el login es exitoso, redirige a la página de gestión de vehículos.
   * En caso de error, muestra un mensaje de alerta.
   * 
   * @returns {void}
   */
  onSubmit(): void {
    this.loginService.loginAdminInventario(this.username, this.password).subscribe({
      next: () => {
        // Redirige al usuario a la página de gestión de vehículos tras un login exitoso
        this.router.navigate(['/vehiculos/gestion']);
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
