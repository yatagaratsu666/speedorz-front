import { OrdenVehiculoDTO } from './orden-vehiculo-dto.model';

/**
 * Clase que representa un objeto de transferencia de datos (DTO) para una orden de compra.
 * Se utiliza para transferir información sobre la compra sin necesidad de incluir instancias completas de clases relacionadas.
 */
export class OrdenCompraDTO {
  /** Fecha en la que se realiza la orden de compra, con valor predeterminado en la fecha actual */
  fecha: string;

  /** Identificador del usuario que gestiona la orden de compra */
  idUsuario: number;

  /** Identificador del cliente que realiza la orden de compra */
  idCliente: number;

  /** Lista de vehículos incluidos en la orden de compra */
  ordenVehiculos: OrdenVehiculoDTO[];

  /**
   * Constructor de la clase OrdenCompraDTO.
   * @param fecha Fecha de la orden de compra, por defecto la fecha actual en formato ISO.
   * @param idUsuario Identificador del usuario que gestiona la orden, por defecto 0.
   * @param idCliente Identificador del cliente que realiza la orden, por defecto 0.
   * @param ordenVehiculos Lista de vehículos incluidos en la orden, por defecto una lista vacía.
   */
  constructor(
    fecha: string = new Date().toISOString(),
    idUsuario: number = 0,
    idCliente: number = 0,
    ordenVehiculos: OrdenVehiculoDTO[] = []
  ) {
    this.fecha = fecha;
    this.idUsuario = idUsuario;
    this.idCliente = idCliente;
    this.ordenVehiculos = ordenVehiculos;
  }
}
