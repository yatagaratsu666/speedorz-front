import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/clientes.service';
import { Cliente } from '../../domain/cliente.model';

/**
 * @class AppRegisterClientComponent
 * @description 
 * Componente para registrar nuevos clientes.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.css']
})
export class AppRegisterClientComponent {

  /**
   * @property cliente
   * @description 
   * Objeto que almacena la información del cliente a registrar.
   */
  cliente: Cliente = {
    idCliente: 0,
    nombreLegal: '',
    numeroIdentificacion: '',
    direccion: '',
    telefono: ''
  };

  /**
   * @constructor
   * @param {Router} router - Servicio para navegación.
   * @param {ClienteService} clientService - Servicio para gestionar clientes.
   */
  constructor(private router: Router, private clientService: ClienteService) {}

  /**
   * @method validarTelefono
   * @description 
   * Valida que el número de teléfono contenga solo dígitos y tenga entre 7 y 15 caracteres.
   * @param {string} telefono - Número de teléfono a validar.
   * @returns {boolean} - True si es válido, false en caso contrario.
   */
  validarTelefono(telefono: string): boolean {
    const regex = /^\d{7,15}$/; // Expresión regular para validar solo números con longitud entre 7 y 15
    return regex.test(telefono);
  }

  /**
   * @method validarRequeridos
   * @description 
   * Verifica que todos los campos requeridos estén llenos.
   * @returns {boolean} - True si hay algún campo vacío, false si todos están completos.
   */
  validarRequeridos(): boolean {
    return !this.cliente.nombreLegal.trim() || 
           !this.cliente.numeroIdentificacion.trim() || 
           !this.cliente.direccion.trim() || 
           !this.cliente.telefono.trim();
  }

  /**
   * @method onSubmit
   * @description 
   * Maneja el envío del formulario y registra un nuevo cliente si las validaciones son correctas.
   */
  onSubmit(): void {
    if (this.validarRequeridos()) {
      alert('Todos los campos son requeridos.');
      return;
    }

    if (!this.validarTelefono(this.cliente.telefono)) {
      alert('Número de teléfono inválido. Debe contener solo números y tener entre 7 y 15 caracteres.');
      return;
    }

    this.clientService.crearCliente(this.cliente).subscribe({
      next: (response) => {
        console.log('Cliente creado exitosamente:', response);
        this.router.navigate(['/clientes/gestion']);
      },
      error: (error) => {
        console.error('Error al crear cliente:', error);
        alert('Error al crear cliente. Inténtalo de nuevo.');
      }
    });
  }
}