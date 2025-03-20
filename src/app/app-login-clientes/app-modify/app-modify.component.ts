import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../domain/cliente.model';
import { ClienteService } from '../../services/clientes.service';

/**
 * @class ModifyClientsComponent
 * @description 
 * Componente para modificar o eliminar un cliente existente.
 */
@Component({
  selector: 'app-mod-customer',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos CommonModule y FormsModule
  templateUrl: './app-modify.component.html',
  styleUrl: './app-modify.component.css'
})
export class ModifyClientsComponent implements OnInit {
  clienteId: number = 0; // ID del cliente obtenido de la URL
  cliente: Cliente = {
    idCliente: 0,
    nombreLegal: '',
    numeroIdentificacion: '',
    direccion: '',
    telefono: ''
  };

  /**
   * @constructor
   * @param {ActivatedRoute} route - Servicio para acceder a los parámetros de la URL.
   * @param {Router} router - Servicio para la navegación entre rutas.
   * @param {ClienteService} clienteService - Servicio para gestionar clientes.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  /**
   * @method ngOnInit
   * @description 
   * Obtiene el ID del cliente desde la URL y carga sus datos.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idCliente');
    this.clienteId = id ? +id : 0;

    if (this.clienteId) {
      this.cargarCliente(this.clienteId);
    }
  }

  /**
   * @method validarTelefono
   * @description 
   * Valida que el número de teléfono contenga solo dígitos y tenga entre 7 y 15 caracteres.
   * @param {string} telefono - Número de teléfono a validar.
   * @returns {boolean} - True si es válido, false en caso contrario.
   */
  validarTelefono(telefono: string): boolean {
    return /^\d{7,15}$/.test(telefono); // Solo números, entre 7 y 15 caracteres.
  }

  /**
   * @method validarRequeridos
   * @description 
   * Verifica que todos los campos obligatorios estén llenos.
   * @returns {boolean} - True si hay algún campo vacío, false si todos están completos.
   */
  validarRequeridos(): boolean {
    return !this.cliente.nombreLegal.trim() ||
           !this.cliente.numeroIdentificacion.trim() ||
           !this.cliente.direccion.trim() ||
           !this.cliente.telefono.trim();
  }

  /**
   * @method cargarCliente
   * @description 
   * Carga los datos del cliente desde el servicio.
   * @param {number} id - ID del cliente a cargar.
   */
  cargarCliente(id: number): void {
    this.clienteService.buscarClientePorId(id).subscribe({
      next: (data) => {
        this.cliente = data;
      },
      error: (error) => {
        console.error('Error al cargar cliente:', error);
        alert('No se pudo cargar la información del cliente.');
      }
    });
  }

  /**
   * @method guardarCambios
   * @description 
   * Valida los datos y actualiza la información del cliente.
   */
  guardarCambios(): void {
    if (this.validarRequeridos()) {
      alert('Todos los campos son requeridos.');
      return;
    }

    if (!this.validarTelefono(this.cliente.telefono)) {
      alert('Número de teléfono inválido. Debe contener solo números y tener entre 7 y 15 caracteres.');
      return;
    }

    this.clienteService.actualizarCliente(this.clienteId, this.cliente).subscribe({
      next: () => {
        console.log('Cliente actualizado correctamente.');
        this.router.navigate(['/clientes/gestion']); // Redirigir tras la actualización
      },
      error: (error) => {
        console.error('Error al actualizar cliente:', error);
        alert('Error al actualizar cliente. Inténtalo de nuevo.');
      }
    });
  }

  /**
   * @method eliminarCliente
   * @description 
   * Solicita confirmación y elimina el cliente si el usuario lo acepta.
   */
  eliminarCliente(): void {
    if (confirm('¿Estás seguro de eliminar este cliente? Esta acción no se puede deshacer.')) {
      this.clienteService.eliminarCliente(this.clienteId).subscribe({
        next: () => {
          console.log('Cliente eliminado correctamente.');
          this.router.navigate(['/clientes/gestion']); // Redirigir tras la eliminación
        },
        error: (error) => {
          console.error('Error al eliminar cliente:', error);
          alert('Error al eliminar cliente. Inténtalo de nuevo.');
        }
      });
    }
  }
}