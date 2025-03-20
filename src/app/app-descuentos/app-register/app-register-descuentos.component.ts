import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Impuesto } from '../../domain/impuesto.model';
import { ImpuestoService } from '../../services/impuestos.service';
import { Descuento } from '../../domain/descuento.model';
import { DescuentoService } from '../../services/descuentos.service';

/**
 * @class LoginComponentClientes
 * @description 
 * Componente de login para clientes.
 */
@Component({
  selector: 'app-app-login',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './app-register-descuentos.component.html',
  styleUrls: ['./app-register-descuentos.component.css']
})
export class AgregarComponentDescuentos {

    descuento: Descuento = new Descuento();

    constructor(private router: Router,
        private descuentoService: DescuentoService
    ) {}

    /**
     * @method onSubmit
     * @description Valida y procesa el formulario del impuesto.
     */
    onSubmit(): void {
        if (!this.descuento.nombre.trim()) {
            alert('Por favor, ingrese un nombre válido');
            return;
        }
        if (this.descuento.porcentaje<=0) {
            alert('Por favor, ingrese un valor válido');
            return;
        }
        console.log('Formulario enviado. Impuesto:', this.descuento);
        this.descuentoService.crearDescuento(this.descuento).subscribe({
            next: () => {
                alert('Impuesto creado con éxito.');
                this.router.navigate(['/descuentos/gestion']);
            },
            error: (error) => {
                console.error('Error al crear impuesto:', error);
                alert('No se pudo crear el impuesto.');
            }
        });
    }

}