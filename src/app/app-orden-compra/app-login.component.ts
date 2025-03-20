import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';

/**
 * @class LoginComponentOrdenCompra
 * @description 
 * Componente encargado de gestionar el inicio de sesión de los asesores comerciales.
 * Permite autenticar a los usuarios y, en caso de éxito, los redirige a la sección de gestión de órdenes de compra.
 * Si la autenticación falla, muestra un mensaje de error.
 *
 * @author Tu Nombre <tuemail@example.com>
 */
@Component({
  selector: 'app-login-orden-compra', // Identificador del componente en el HTML
  imports: [CommonModule, RouterModule, FormsModule, CommonModule], // Módulos necesarios para el funcionamiento del componente
  templateUrl: './app-login.component.html', // Ubicación de la plantilla HTML del componente
  styleUrls: ['./app-login.component.css'] // Ubicación del archivo de estilos CSS del componente
})
export class LoginComponentOrdenCompra {
  
  /**
   * Nombre de usuario ingresado por el asesor comercial en el formulario de inicio de sesión.
   * @type {string}
   */
  username: string = ''; 

  /**
   * Contraseña ingresada por el asesor comercial en el formulario de inicio de sesión.
   * @type {string}
   */
  password: string = '';

  /**
   * @constructor
   * @param {LoginServiceService} loginService - Servicio encargado de manejar la autenticación del usuario.
   * @param {Router} router - Módulo de enrutamiento para redirigir al usuario tras la autenticación.
   */
  constructor(
    private loginService: LoginServiceService, 
    private router: Router 
  ) {}

  /**
   * @method onSubmit
   * @description 
   * Método invocado cuando el usuario envía el formulario de inicio de sesión.
   * Llama al servicio `LoginServiceService` para autenticar al usuario.
   * - Si la autenticación es exitosa, el usuario es redirigido a la página de gestión de órdenes de compra.
   * - Si falla, se muestra un mensaje de error indicando credenciales incorrectas.
   * @returns {void}
   */
  onSubmit(): void {
    this.loginService.loginAsesorComercial(this.username, this.password).subscribe({
      next: () => {
        // Redirige al usuario a la sección de órdenes de compra tras una autenticación exitosa
        this.router.navigate(['/ordenCompra/venta']);
      },
      error: (error) => {
        console.error('Error en el inicio de sesión:', error);
        // Notifica al usuario que las credenciales son incorrectas
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
