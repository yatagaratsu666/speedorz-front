import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppOrdencTablaComponent } from "./app-ordenc-tabla/app-ordenc-tabla.component";
import { OrdenCompraDTO } from '../../domain/orden-compra-dto.model';
import { OrdenVehiculoDTO } from '../../domain/orden-vehiculo-dto.model';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

/**
 * @class AppOrdencComponent
 * @description 
 * Componente encargado de gestionar las órdenes de compra.  
 * Permite la asignación de vehículos a la orden y su almacenamiento en el sistema.
 */
@Component({
  selector: 'app-app-ordenc', // Selector del componente en la plantilla
  imports: [CommonModule, AppOrdencTablaComponent, FormsModule], // Módulos requeridos
  templateUrl: './app-ordenc.component.html', // Archivo de plantilla HTML
  styleUrls: ['./app-ordenc.component.css'] // Archivo de estilos CSS
})
export class AppOrdencComponent {

  /**
   * @property {OrdenCompraDTO} ordenCompra - Representa la orden de compra en proceso.
   */
  ordenCompra: OrdenCompraDTO = new OrdenCompraDTO();

  /**
   * @property {boolean} refrescarListas - Indica si se debe actualizar la lista de órdenes.
   */
  refrescarListas: boolean = false;

  /**
   * @constructor
   * @param {OrdenCompraService} ordenCompraService - Servicio para la gestión de órdenes de compra.
   */
  constructor(
    private ordenCompraService: OrdenCompraService
  ) { }

  /**
   * @method actualizarOrdenVehiculos
   * @description Asigna una lista de vehículos a la orden de compra.
   * @param {OrdenVehiculoDTO[]} ordenVehiculos - Vehículos a asociar con la orden.
   * @returns {void}
   */
  actualizarOrdenVehiculos(ordenVehiculos: OrdenVehiculoDTO[]): void {
    this.ordenCompra.ordenVehiculos = ordenVehiculos;
  }

  /**
   * @method guardarOrden
   * @description Guarda la orden de compra en el sistema, asignándole la fecha actual.  
   * Maneja la respuesta del servidor y notifica el resultado al usuario.
   * @returns {void}
   */
guardarOrden(): void {
  this.ordenCompra.fecha = new Date().toISOString();

  console.log('Orden a guardar:', this.ordenCompra);

  this.ordenCompraService.crearOrdenCompra(this.ordenCompra).subscribe({
    next: (respuesta) => {
      console.log('Respuesta del servidor:', respuesta);

      Swal.fire({
        icon: 'success',
        title: '¡Orden guardada, Dirigete a la caja para completar pago!',
        html: `
                <p>ID de la Orden: ${respuesta.idOrdenCompra}</p>
                <p>ID Cliente: ${respuesta.cliente.idCliente}</p>
                <p>Nombre Cliente:  ${respuesta.cliente.nombreLegal}</p>
                <p>Cedula: ${respuesta.cliente.numeroIdentificacion}</p>
                <p>Subtotal: $ ${respuesta.subtotal}</p>
                <p>Total: $ ${respuesta.total}</p>
                <p>Fecha de Creación: ${respuesta.fecha}</p>
               `,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
        background: '#f1f1f1',
        width: '600px'
      });

      this.emitirActualizacion();
    },
    error: (error) => {
      console.error('Error al guardar orden', error);

      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonColor: '#d33'
      });
    }
  });
}

  /**
   * @method emitirActualizacion
   * @description Activa la bandera `refrescarListas` para indicar que se ha actualizado la orden.  
   * Luego de un tiempo, reinicia la bandera para permitir futuras actualizaciones.
   * @returns {void}
   */
  emitirActualizacion(): void {
    this.refrescarListas = true;
    setTimeout(() => {
      this.refrescarListas = false; // Restablece la bandera
    });
  }
}
