import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Componente principal de la aplicación.
 * 
 * Este componente actúa como la raíz de la aplicación y contiene la configuración 
 * base para la navegación y el manejo de la interfaz de usuario.
 */
@Component({
  selector: 'app-root', // Selector utilizado para referenciar este componente en la plantilla HTML
  standalone: true, // Indica que este componente es independiente y no forma parte de un módulo
  imports: [CommonModule, RouterModule], // Módulos necesarios para la funcionalidad del componente
  templateUrl: './app.component.html', // Ruta del archivo de plantilla HTML del componente
  styleUrl: './app.component.css' // Ruta del archivo de estilos CSS del componente
})
export class AppComponent {
  /** Título de la aplicación. */
  title = 'front-PI1';
}
