import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Impuesto } from '../../domain/impuesto.model';
import { ImpuestoService } from '../../services/impuestos.service';

/**
 * @class LoginComponentClientes
 * @description 
 * Componente de login para clientes.
 */
@Component({
  selector: 'app-app-login',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './app-register-impuesto.component.html',
  styleUrls: ['./app-register-impuesto.component.css']
})
export class AgregarComponentImpuestos {

    impuesto: Impuesto = new Impuesto();

    constructor(private router: Router,
        private impuestoService: ImpuestoService
    ) {}

    /**
     * @method onSubmit
     * @description Valida y procesa el formulario del impuesto.
     */
    onSubmit(): void {
        if (!this.impuesto.nombre.trim()) {
            alert('Por favor, ingrese un nombre válido');
            return;
        }
        if (this.impuesto.porcentaje<=0) {
            alert('Por favor, ingrese un valor válido');
            return;
        }
        console.log('Formulario enviado. Impuesto:', this.impuesto);
        this.impuestoService.crearImpuesto(this.impuesto).subscribe({
            next: () => {
                alert('Impuesto creado con éxito.');
                this.router.navigate(['/impuestos/gestion']);
            },
            error: (error) => {
                console.error('Error al crear impuesto:', error);
                alert('No se pudo crear el impuesto.');
            }
        });
    }

}