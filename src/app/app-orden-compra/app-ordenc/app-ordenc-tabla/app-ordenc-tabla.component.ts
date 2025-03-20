import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Descuento } from '../../../domain/descuento.model';
import { Impuesto } from '../../../domain/impuesto.model';
import { Vehiculo } from '../../../domain/vehiculo.model';
import { DescuentoService } from '../../../services/descuentos.service';
import { ImpuestoService } from '../../../services/impuestos.service';
import { PromocionService } from '../../../services/promocion.service';
import { OrdenVehiculoDTO } from '../../../domain/orden-vehiculo-dto.model';

/**
 * @class AppOrdencTablaComponent
 * @description Componente encargado de mostrar y gestionar la tabla de órdenes de compra.  
 * Permite listar vehículos, descuentos e impuestos, y actualizar la orden de compra en base a la selección del usuario.
 *
 * @author Tu Nombre <tuemail@example.com>
 */
@Component({
  selector: 'app-app-ordenc-tabla', // Selector del componente
  imports: [], // No hay módulos adicionales importados directamente
  templateUrl: './app-ordenc-tabla.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './app-ordenc-tabla.component.css' // Ruta del archivo de estilos CSS
})
export class AppOrdencTablaComponent implements OnInit {

  /**
   * Lista de descuentos disponibles.
   * @type {Descuento[]}
   */
  descuentos: Descuento[] = [];

  /**
   * Lista de impuestos disponibles.
   * @type {Impuesto[]}
   */
  impuestos: Impuesto[] = [];

  /**
   * Lista de vehículos disponibles.
   * @type {Vehiculo[]}
   */
  vehiculos: Vehiculo[] = [];

  /**
   * @constructor
   * @param {DescuentoService} descuentosService - Servicio para obtener descuentos.
   * @param {ImpuestoService} impuestosService - Servicio para obtener impuestos.
   * @param {PromocionService} vehiculosService - Servicio para obtener vehículos.
   */
  constructor(
    private descuentosService: DescuentoService,
    private impuestosService: ImpuestoService,
    private vehiculosService: PromocionService
  ) {}

  /**
   * @method ngOnInit
   * @description Método de inicialización del componente.  
   * Carga la lista de descuentos, impuestos y vehículos desde los servicios correspondientes.
   * @returns {void}
   */
  ngOnInit(): void {
    this.descuentosService.listarDescuentos().subscribe({
      next: (descuentos) => {
        this.descuentos = descuentos;
      },
      error: (error) => {
        console.error('Error al obtener descuentos', error);
      }
    });

    this.impuestosService.listarImpuestos().subscribe({
      next: (impuestos) => {
        this.impuestos = impuestos;
      },
      error: (error) => {
        console.error('Error al obtener impuestos', error);
      }
    });

    this.vehiculosService.getVehiculos().subscribe({
      next: (vehiculos) => {
        this.vehiculos = vehiculos;
      },
      error: (error) => {
        console.error('Error al obtener vehículos', error);
      }
    });
  }

  /**
   * Evento que emite la lista de vehículos seleccionados en la orden de compra.
   * @event ordenVehiculosChange
   */
  @Output() ordenVehiculosChange = new EventEmitter<OrdenVehiculoDTO[]>();

  /**
   * Lista de vehículos agregados a la orden de compra.
   * @type {OrdenVehiculoDTO[]}
   */
  ordenVehiculos: OrdenVehiculoDTO[] = [];

  /**
   * @method actualizarOrden
   * @description Actualiza la lista de vehículos en la orden de compra basada en los valores ingresados por el usuario.  
   * Captura la cantidad, impuestos y descuentos de cada vehículo y emite el evento `ordenVehiculosChange`.
   * @returns {void}
   */
  actualizarOrden(): void {
    this.ordenVehiculos = this.vehiculos.map((vehiculo, index) => {
      const cantidadInput = (document.querySelectorAll('.input-box-cantidad')[index] as HTMLInputElement).value;
      const impuestosInput = (document.querySelectorAll('.input-box-impuestos')[index] as HTMLInputElement).value;
      const descuentosInput = (document.querySelectorAll('.input-box-descuentos')[index] as HTMLInputElement).value;

      return new OrdenVehiculoDTO(
        vehiculo.idVehiculo,
        Number(cantidadInput),
        descuentosInput.split(',').map(Number),
        impuestosInput.split(',').map(Number)
      );
    });

    this.ordenVehiculosChange.emit(this.ordenVehiculos);
  }

  /**
   * Indica si se deben refrescar las listas de vehículos, impuestos y descuentos.
   * @type {boolean}
   */
  @Input() refrescarListas: boolean = false;

  /**
   * @method ngOnChanges
   * @description Método que detecta cambios en los inputs del componente.  
   * Si la propiedad `refrescarListas` cambia a `true`, actualiza las listas de datos.
   * @param {SimpleChanges} changes - Cambios detectados en las propiedades del componente.
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refrescarListas'] && changes['refrescarListas'].currentValue) {
      this.actualizarListas();
    }
  }

  /**
   * @method actualizarListas
   * @description Método que recarga las listas de descuentos, impuestos y vehículos.  
   * Se ejecuta cuando se requiere actualizar la información en la vista.
   * @returns {void}
   */
  actualizarListas(): void {
    console.log('Actualizando listas del hijo...');
    this.ngOnInit();
  }
}