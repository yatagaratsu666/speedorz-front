/**
 * Clase que representa un impuesto aplicado a productos o servicios.
 */
export class Impuesto {
    /** Identificador único del impuesto */
    id: number;

    /** Nombre del impuesto (por ejemplo, IVA, impuesto municipal, etc.) */
    nombre: string;

    /** Descripción detallada del impuesto */
    descripcion: string;

    /** Porcentaje del impuesto aplicado (por ejemplo, 19 para un 19%) */
    porcentaje: number;

    /**
     * Constructor de la clase Impuesto.
     * @param id Identificador único del impuesto, por defecto 0.
     * @param nombre Nombre del impuesto, por defecto una cadena vacía.
     * @param descripcion Descripción del impuesto, por defecto una cadena vacía.
     * @param porcentaje Porcentaje del impuesto aplicado, por defecto 0.
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
