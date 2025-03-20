/**
 * Clase que representa un vehículo.
 */
export class Vehiculo {
  /**
   * Identificador único del vehículo.
   */
  idVehiculo: number;

  /**
   * Nombre del vehículo.
   */
  nombre: string;

  /**
   * Marca del vehículo.
   */
  marca: string;

  /**
   * Modelo del vehículo.
   */
  modelo: string;

  /**
   * Descripción del vehículo.
   */
  descripcion: string;

  /**
   * Cantidad disponible en stock.
   */
  stock: number;

  /**
   * Precio del vehículo.
   */
  precio: number;

  /**
   * Constructor de la clase Vehiculo.
   * @param idVehiculo Identificador único del vehículo (por defecto 0).
   * @param nombre Nombre del vehículo (por defecto cadena vacía).
   * @param marca Marca del vehículo (por defecto cadena vacía).
   * @param modelo Modelo del vehículo (por defecto cadena vacía).
   * @param descripcion Descripción del vehículo (por defecto cadena vacía).
   * @param stock Cantidad disponible en stock (por defecto 0).
   * @param precio Precio del vehículo (por defecto 0).
   */
  constructor(
    idVehiculo: number = 0,
    nombre: string = '',
    marca: string = '',
    modelo: string = '',
    descripcion: string = '',
    stock: number = 0,
    precio: number = 0
  ) {
    this.idVehiculo = idVehiculo;
    this.nombre = nombre;
    this.marca = marca;
    this.modelo = modelo;
    this.descripcion = descripcion;
    this.stock = stock;
    this.precio = precio;
  }
}
