import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Para redirigir después del registro
import { Vehiculo } from '../../domain/vehiculo.model';
import { VehiculoService } from '../../services/vehiculos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * Componente para registrar un nuevo vehículo en el sistema.
 * Incluye validaciones en el formulario antes de enviar los datos al servicio.
 *@component RegistroComponentVehiculos
 * @class RegistroComponentVehiculos
 * @style ./app-register.component.css
 */
@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class RegistroComponentVehiculos {
  
  /**
   * Objeto que almacena los datos del vehículo a registrar.
   * 
   * @type {Vehiculo}
   */
  vehicle: Vehiculo = {
    idVehiculo: 0,
    nombre: '',
    descripcion: '',
    marca: 'Speedorz',
    modelo: '',
    stock: 0,
    precio: 0
  };

  /**
   * Crea una instancia de RegistroComponentVehiculos.
   *
   * @param {VehiculoService} vehiculoService - Servicio para gestionar vehículos.
   * @param {Router} router - Servicio de enrutamiento para redirigir después del registro.
   */
  constructor(
    private vehiculoService: VehiculoService,
    private router: Router
  ) {}

  /**
   * Valida que los campos obligatorios no estén vacíos.
   *
   * @returns {boolean} `true` si algún campo obligatorio está vacío, de lo contrario `false`.
   * @memberof RegistroComponentVehiculos
   */
  validarRequeridos(): boolean {
    return this.vehicle.nombre.trim() === '' || 
           this.vehicle.descripcion.trim() === '' || 
           this.vehicle.modelo.trim() === '' || 
           this.vehicle.stock === 0 || 
           this.vehicle.precio === 0;
  }

  /**
   * Valida que el precio del vehículo sea mayor a 0.
   *
   * @param {number} precio - Precio ingresado para el vehículo.
   * @returns {boolean} `true` si el precio es mayor a 0, de lo contrario `false`.
   * @memberof RegistroComponentVehiculos
   */
  validarPrecio(precio: number): boolean {
    return precio > 0;
  }

  /**
   * Valida que el stock del vehículo sea mayor a 0.
   *
   * @param {number} stock - Cantidad en stock del vehículo.
   * @returns {boolean} `true` si el stock es mayor a 0, de lo contrario `false`.
   * @memberof RegistroComponentVehiculos
   */
  validarStock(stock: number): boolean {
    return stock > 0;
  }

  /**
   * Valida los datos ingresados y, si son correctos, envía la solicitud para registrar el vehículo.
   * En caso de éxito, redirige a la lista de vehículos.
   *
   * @returns {void}
   * @memberof RegistroComponentVehiculos
   */
  registerVehicle(): void {
    if (this.validarRequeridos()) {
      alert('Todos los campos son requeridos.');
      return;
    }
    if (!this.validarPrecio(this.vehicle.precio)) {
      alert('El precio debe ser mayor a 0.');
      return;
    }
    if (!this.validarStock(this.vehicle.stock)) {
      alert('El stock debe ser mayor a 0.');
      return;
    }

    this.vehiculoService.crearVehiculo(this.vehicle).subscribe({
      next: (response) => {
        console.log('Vehículo registrado:', response);
        this.irAListaVehiculos();
      },
      error: (error) => {
        console.error('Error al registrar vehículo:', error);
        alert('Error al registrar vehículo. Inténtalo de nuevo.');
      }
    });
  }

  /**
   * Redirige a la lista de vehículos después del registro exitoso.
   *
   * @returns {void}
   * @memberof RegistroComponentVehiculos
   */
  irAListaVehiculos(): void {
    this.router.navigate(['/vehiculos/gestion']);
  }
}
