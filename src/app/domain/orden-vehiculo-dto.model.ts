/**
 * Clase que representa un Data Transfer Object (DTO) para una orden de vehículo.
 * Contiene la información necesaria para realizar una orden con descuentos e impuestos aplicables.
 */
export class OrdenVehiculoDTO {
  /** Identificador único del vehículo en la orden */
  idVehiculo: number;

  /** Cantidad de unidades del vehículo solicitadas en la orden */
  cantidad: number;

  /** Lista de identificadores de los descuentos aplicados a la orden */
  idDescuentos: number[];

  /** Lista de identificadores de los impuestos aplicados a la orden */
  idImpuestos: number[];

  /**
   * Constructor de la clase OrdenVehiculoDTO.
   * @param idVehiculo Identificador del vehículo (por defecto 0).
   * @param cantidad Cantidad de unidades del vehículo en la orden (por defecto 0).
   * @param idDescuentos Lista de identificadores de descuentos aplicados (por defecto vacío).
   * @param idImpuestos Lista de identificadores de impuestos aplicados (por defecto vacío).
   */
  constructor(
    idVehiculo: number = 0,
    cantidad: number = 0,
    idDescuentos: number[] = [],
    idImpuestos: number[] = []
  ) {
    this.idVehiculo = idVehiculo;
    this.cantidad = cantidad;
    this.idDescuentos = idDescuentos;
    this.idImpuestos = idImpuestos;
  }
}
