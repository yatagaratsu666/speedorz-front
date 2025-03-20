import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';

/**
 * @class LoginComponentClientes
 * @description 
 * Componente de login para clientes.
 */
@Component({
  selector: 'app-app-login',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class LoginComponentClientes {
  
  /**
   * @property username
   * @description 
   * Nombre de usuario ingresado por el cliente.
   */
  username: string = '';

  /**
   * @property password
   * @description 
   * Contraseña ingresada por el cliente.
   */
  password: string = '';

  /**
   * @constructor
   * @param {LoginServiceService} loginService - Servicio de autenticación.
   * @param {Router} router - Servicio de navegación.
   */
  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  /**
   * @method onSubmit
   * @description 
   * Maneja el envío del formulario de login.
   */
  onSubmit(): void {
    this.loginService.loginAdminRecepcion(this.username, this.password).subscribe({
      next: () => {
        console.log('Inicio de sesión exitoso.');
        this.router.navigate(['/clientes/gestion']); // Redirige tras login exitoso
      },
      error: (error) => {
        console.error('Error en inicio de sesión:', error);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}