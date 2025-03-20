import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from '../../../domain/vehiculo.model';
import { VehiculoService } from '../../../services/vehiculos.service';

/**
 * @class GestionListaVehiculosComponent
 * @description 
 * Componente que gestiona la lista de vehículos filtrados.  
 * Permite modificar y eliminar vehículos.
 */
@Component({
  selector: 'app-gestion-lista-vehiculos', // Selector del componente
  templateUrl: './app-gestion-lista.component.html', // Ruta del HTML
  styleUrls: ['./app-gestion-lista.component.css'] // Ruta del archivo de estilos CSS
})
export class GestionListaVehiculosComponent {

  /**
   * Lista de vehículos filtrados que recibe del componente padre.
   * @type {Vehiculo[]}
   */
  @Input() vehiculosFiltrados: Vehiculo[] = [];

  /**
   * Evento que se emite cuando un vehículo es actualizado o eliminado,
   * notificando al componente padre.
   * @type {EventEmitter<void>}
   */
  @Output() vehiculoActualizado = new EventEmitter<void>();

  /**
   * @constructor
   * @param {VehiculoService} vehiculoService - Servicio para gestionar los vehículos.
   * @param {Router} router - Servicio de enrutamiento para navegar entre vistas.
   */
  constructor(
    private vehiculoService: VehiculoService,
    private router: Router
  ) {}

  /**
   * @method modificarVehiculo
   * @description Navega a la página de modificación de un vehículo.
   * @param {number} id - ID del vehículo a modificar.
   * @returns {void}
   */
  modificarVehiculo(id: number): void {
    this.router.navigate(['/vehiculos/modify', id]);
  }

  /**
   * @method eliminarVehiculo
   * @description Elimina un vehículo tras la confirmación del usuario.
   * @param {number} id - ID del vehículo a eliminar.
   * @returns {void}
   */
  eliminarVehiculo(id: number): void {
    if (confirm('¿Estás seguro de eliminar este vehículo?')) {
      this.vehiculoService.eliminarVehiculo(id).subscribe({
        next: () => {
          console.log('Vehículo eliminado:', id);
          this.vehiculoActualizado.emit(); // Notifica al padre que un vehículo fue eliminado
        },
        error: (error) => {
          console.error('Error al eliminar vehículo:', error);
          alert('Error al eliminar vehículo. Inténtalo de nuevo.');
        }
      });
    }
  }
}