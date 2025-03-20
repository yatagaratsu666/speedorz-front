/**
 * Clase que representa un descuento aplicado a productos o servicios.
 */
export class Descuento {
    /** Identificador único del descuento */
    id: number;

    /** Nombre del descuento (por ejemplo, Descuento por fidelidad, Promoción especial, etc.) */
    nombre: string;

    /** Descripción detallada del descuento */
    descripcion: string;

    /** Porcentaje de descuento aplicado (por ejemplo, 10 para un 10%) */
    porcentaje: number;

    /**
     * Constructor de la clase Descuento.
     * @param id Identificador único del descuento, por defecto 0.
     * @param nombre Nombre del descuento, por defecto una cadena vacía.
     * @param descripcion Descripción del descuento, por defecto una cadena vacía.
     * @param porcentaje Porcentaje del descuento aplicado, por defecto 0.
     */
    constructor(
        id: number = 0,
        nombre: string = '',
        descripcion: string = '',
        porcentaje: number = 0
    ) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.porcentaje = porcentaje;
    }
}
