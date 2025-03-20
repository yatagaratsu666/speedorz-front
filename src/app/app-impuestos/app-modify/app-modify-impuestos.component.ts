import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  templateUrl: './app-modify-impuestos.component.html',
  styleUrls: ['./app-modify-impuestos.component.css']
})
export class ModifyComponentImpuestos implements OnInit {

    impuesto: Impuesto = {
        id: 0,
        nombre: '',
        porcentaje: 0,
        descripcion: ''
    };

    idImpuesto: number | null = null;

    constructor(private router: Router,
        private impuestoService: ImpuestoService,
        private route: ActivatedRoute
    ) {}


    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('idImpuesto');
        this.idImpuesto = idParam ? +idParam : null;
        console.log('ID del impuesto:', this.idImpuesto);
        if (this.idImpuesto) {
          this.cargarImpuesto(this.idImpuesto);
        }
    }

    /**
     * @method cargarImpuesto
     * @description Obtiene el impuesto desde el servicio.
     */
    cargarImpuesto(id: number): void {
        this.impuestoService.obtenerImpuesto(id).subscribe({
            next: (data) => {
                this.impuesto = data;
            },
            error: (error) => {
                console.error('Error al cargar impuesto:', error);
                alert('No se pudo obtener el impuesto.');
            }
        });
    }


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
        this.impuestoService.actualizarImpuesto(this.impuesto).subscribe({
            next: () => {
                alert('Impuesto actualizado con éxito.');
                this.router.navigate(['/impuestos/gestion']);
            },
            error: (error) => {
                console.error('Error al actualizar impuesto:', error);
                alert('No se pudo crear el impuesto.');
            }
        });
    }

}