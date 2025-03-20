import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Impuesto } from '../../domain/impuesto.model';
import { ImpuestoService } from '../../services/impuestos.service';

@Component({
  selector: 'app-impuestos',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './app-impuestos.component.html',
  styleUrls: ['./app-impuestos.component.css']
})
export class AppImpuestosComponent implements OnInit { 
  impuestoId: string = ''; // Propiedad para el ID del impuesto


  impuestos: Impuesto[] = []; // Lista de impuestos


  constructor(private router: Router,
    private impuestoService: ImpuestoService
  ) {}

  /**
   * @method onSubmit
   * @description Valida y procesa el formulario del impuesto.
   */
  onSubmit(): void {
    if (!this.impuestoId.trim()) {
      alert('Por favor, ingrese un ID de impuesto válido.');
      return;
    }
    console.log('Formulario enviado. ID del impuesto:', this.impuestoId);
  }

  ngOnInit(): void {
    this.cargarImpuestos();
  }

  /**
   * @method cargarImpuestos
   * @description Obtiene la lista completa de impuestos desde el servicio.
   */
  cargarImpuestos(): void {
    this.impuestoService.listarImpuestos().subscribe({
      next: (data) => {
        this.impuestos = data;
      },
      error: (error) => {
        console.error('Error al cargar impuestos:', error);
        alert('No se pudo obtener la lista de impuestos.');
      }
    });
  }

  /**
   * @method eliminarImpuesto
   * @description Elimina un impuesto por su ID.
   */
  eliminarImpuesto(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar el impuesto?')) {
    this.impuestoService.eliminarImpuesto(id).subscribe({
      next: () => {
        this.cargarImpuestos();
      },
      error: (error) => {
        console.error('Error al eliminar impuesto:', error);
        alert('No se pudo eliminar el impuesto.');
      }
    });
    }
  }


  /**
   * @method editarImpuesto
   * @description Redirige a la página de edición de un impuesto.
   */
  modificarImpuesto(id: number): void {
    this.router.navigate(['/impuestos/modify', id]);
  }
    
  /**
   * @method crearImpuesto
   * @description Redirige a la página de creación de un impuesto.
   */
  agregarImpuesto(): void {
    this.router.navigate(['/impuestos/register']);
  }
}
