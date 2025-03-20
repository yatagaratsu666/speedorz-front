/**
 * Clase que representa a un cliente en el sistema.
 */
export class Cliente {
  /** Identificador único del cliente */
  idCliente: number;

  /** Nombre legal del cliente (razón social o nombre completo) */
  nombreLegal: string;

  /** Número de identificación (por ejemplo, NIT o cédula) */
  numeroIdentificacion: string;

  /** Dirección del cliente */
  direccion: string;

  /** Número de teléfono del cliente */
  telefono: string;

  /**
   * Constructor de la clase Cliente.
   * @param idCliente Identificador único del cliente, por defecto 0.
   * @param nombreLegal Nombre legal del cliente, por defecto una cadena vacía.
   * @param numeroIdentificacion Número de identificación del cliente, por defecto una cadena vacía.
   * @param direccion Dirección del cliente, por defecto una cadena vacía.
   * @param telefono Número de teléfono del cliente, por defecto una cadena vacía.
   */
  constructor(
    idCliente: number = 0,
    nombreLegal: string = '',
    numeroIdentificacion: string = '',
    direccion: string = '',
    telefono: string = ''
  ) {
    this.idCliente = idCliente;
    this.nombreLegal = nombreLegal;
    this.numeroIdentificacion = numeroIdentificacion;
    this.direccion = direccion;
    this.telefono = telefono;
  }
}
