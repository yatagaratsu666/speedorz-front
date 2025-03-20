/**
 * Clase que representa un usuario en el sistema.
 */
export class Usuario {
  /**
   * Identificador único del usuario.
   */
  idUsuario: number;

  /**
   * Nombre de usuario utilizado para autenticación.
   */
  nombreUsuario: string;

  /**
   * Nombre completo del usuario.
   */
  nombreCompleto: string;

  /**
   * Contraseña del usuario.
   */
  contrasena: string;

  /**
   * Número de cédula del usuario.
   */
  cedula: string;

  /**
   * Dirección de residencia del usuario.
   */
  direccion: string;

  /**
   * Número de teléfono del usuario.
   */
  telefono: string;

  /**
   * Rol del usuario dentro del sistema (por ejemplo, administrador, cliente, etc.).
   */
  rol: string;

  /**
   * Estado del usuario (activo, inactivo, etc.).
   */
  estado: string;

  /**
   * Constructor de la clase Usuario.
   * @param idUsuario Identificador único del usuario (por defecto 0).
   * @param nombreUsuario Nombre de usuario utilizado para autenticación (por defecto cadena vacía).
   * @param nombreCompleto Nombre completo del usuario (por defecto cadena vacía).
   * @param contrasena Contraseña del usuario (por defecto cadena vacía).
   * @param cedula Número de cédula del usuario (por defecto cadena vacía).
   * @param direccion Dirección de residencia del usuario (por defecto cadena vacía).
   * @param telefono Número de teléfono del usuario (por defecto cadena vacía).
   * @param rol Rol del usuario dentro del sistema (por defecto cadena vacía).
   * @param estado Estado del usuario (por defecto cadena vacía).
   */
  constructor(
    idUsuario: number = 0,
    nombreUsuario: string = '',
    nombreCompleto: string = '',
    contrasena: string = '',
    cedula: string = '',
    direccion: string = '',
    telefono: string = '',
    rol: string = '',
    estado: string = ''
  ) {
    this.idUsuario = idUsuario;
    this.nombreUsuario = nombreUsuario;
    this.nombreCompleto = nombreCompleto;
    this.contrasena = contrasena;
    this.cedula = cedula;
    this.direccion = direccion;
    this.telefono = telefono;
    this.rol = rol;
    this.estado = estado;
  }
}
