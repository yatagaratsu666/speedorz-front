import { Cliente } from "./cliente.model";
import { Usuario } from "./usuario.model";

/**
 * Clase que representa una orden de compra realizada por un cliente.
 * Contiene información sobre el usuario que la gestionó, el cliente que la realizó
 * y los valores monetarios de la orden.
 */
export class OrdenCompra {
    /** Identificador único de la orden de compra */
    idOrdenCompra: number;

    /** Fecha en la que se realizó la orden de compra */
    fecha: string;

    /** Subtotal del valor de la orden antes de aplicar impuestos y descuentos */
    subtotal: number;

    /** Total final de la orden de compra después de aplicar impuestos y descuentos */
    total: number;

    /** Usuario responsable de gestionar la orden de compra */
    usuario: Usuario;

    /** Cliente que realizó la orden de compra */
    cliente: Cliente;

    /**
     * Constructor de la clase OrdenCompra.
     * @param idOrdenCompra Identificador único de la orden (por defecto 0).
     * @param fecha Fecha en la que se realizó la orden (por defecto cadena vacía).
     * @param subtotal Subtotal de la orden antes de impuestos y descuentos (por defecto 0).
     * @param total Total de la orden después de impuestos y descuentos (por defecto 0).
     * @param usuario Usuario que gestionó la orden (por defecto instancia vacía de Usuario).
     * @param cliente Cliente que realizó la orden (por defecto instancia vacía de Cliente).
     */
    constructor(
        idOrdenCompra: number = 0,
        fecha: string = '',
        subtotal: number = 0,
        total: number = 0,
        usuario: Usuario = new Usuario(),
        cliente: Cliente = new Cliente()
    ) {
        this.idOrdenCompra = idOrdenCompra;
        this.fecha = fecha;
        this.subtotal = subtotal;
        this.total = total;
        this.usuario = usuario;
        this.cliente = cliente;
    }
}
