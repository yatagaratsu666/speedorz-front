import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Impuesto } from '../../domain/impuesto.model';
import { ImpuestoService } from '../../services/impuestos.service';
import { Descuento } from '../../domain/descuento.model';
import { DescuentoService } from '../../services/descuentos.service';

@Component({
  selector: 'app-impuestos',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './app-impuestos.component.html',
  styleUrls: ['./app-impuestos.component.css']
})
export class AppDescuentosComponent implements OnInit { 

  descuentos: Descuento[] = []; // Lista de impuestos


  constructor(private router: Router,
    private descuentoService: DescuentoService
  ) {}

  ngOnInit(): void {
    this.cargarImpuestos();
  }

  /**
   * @method cargarImpuestos
   * @description Obtiene la lista completa de impuestos desde el servicio.
   */
  cargarImpuestos(): void {
    this.descuentoService.listarDescuentos().subscribe({
      next: (data) => {
        this.descuentos = data;
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
  eliminarDescuento(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar el descuento?')) {
    this.descuentoService.eliminarDescuento(id).subscribe({
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
  modificarDescuento(id: number): void {
    this.router.navigate(['/descuentos/modify', id]);
  }
    
  /**
   * @method crearImpuesto
   * @description Redirige a la página de creación de un impuesto.
   */
  agregarDescuento(): void {
    this.router.navigate(['/descuentos/register']);
  }
}
