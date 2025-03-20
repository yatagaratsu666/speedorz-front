import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehiculo } from '../domain/vehiculo.model';
import { PromocionService } from '../services/promocion.service';

/**
 * @class SampleCustomerComponent
 * @description 
 * Componente encargado de obtener y mostrar una lista de vehículos en promoción.
 * Utiliza el servicio `PromocionService` para obtener los datos de los vehículos desde la API.
 */
@Component({
  selector: 'app-sample-customer', // Selector del componente
  standalone: true, // Indica que el componente es independiente y no necesita un módulo
  imports: [CommonModule], // Módulos importados para el componente
  templateUrl: './app-promocion.component.html', // Ruta del archivo de plantilla HTML
  styleUrls: ['./app-promocion.component.css'] // Ruta del archivo de estilos CSS
})
export class SampleCustomerComponent {
  
  /**
   * Lista de vehículos obtenidos del servicio.
   * @type {Vehiculo[]}
   */
  vehiculos: Vehiculo[] = [];

  /**
   * @constructor
   * @param {PromocionService} promocionService - Servicio encargado de obtener la lista de vehículos en promoción.
   */
  constructor(private promocionService: PromocionService) {
    this.getVehiculos();
  }

  /**
   * @method getVehiculos
   * @description Obtiene la lista de vehículos en promoción desde el servicio `PromocionService`.
   * Suscribe a la respuesta del servicio y asigna los datos al arreglo `vehiculos`.
   * En caso de error, se captura y se muestra en la consola.
   *
   * @returns {void}
   */
  getVehiculos(): void {
    this.promocionService.getVehiculos().subscribe({
      next: (response) => {
        this.vehiculos = response;
      },
      error: (error) => {
        console.error('Error al obtener los vehículos', error);
      }
    });
  }
}
