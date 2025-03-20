import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../domain/usuario.model';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @class ModifyComponentUsers
 * @description 
 * Componente para modificar los datos de un usuario existente.
 */
@Component({
  selector: 'app-app-modify', // Selector del componente
  imports: [RouterModule, FormsModule, CommonModule], // Módulos necesarios
  templateUrl: './app-modify.component.html', // Ruta al HTML del componente
  styleUrls: ['./app-modify.component.css'] // Ruta a los estilos CSS
})
export class ModifyComponentUsers implements OnInit {

  /**
   * @property usuario
   * @description 
   * Objeto que almacena los datos del usuario a modificar.
   * @type {Usuario}
   */
  usuario: Usuario = {
    idUsuario: 0,
    nombreCompleto: '',
    nombreUsuario: '',
    contrasena: '',
    cedula: '',
    direccion: '',
    telefono: '',
    rol: 'RECEPCION', // Rol por defecto
    estado: 'ACTIVO' // Estado por defecto
  };

  /**
   * @property idUsuario
   * @description 
   * Identificador del usuario que se modificará.
   * @type {number | null}
   */
  idUsuario: number | null = null;

  /**
   * @constructor
   * @param {ActivatedRoute} route - Servicio para capturar parámetros de la ruta.
   * @param {UsuariosService} usuariosService - Servicio para manejar usuarios.
   * @param {Router} router - Servicio de enrutamiento.
   */
  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  /**
   * @method ngOnInit
   * @description 
   * Método de inicialización del componente.
   * Captura el parámetro de la URL y carga los datos del usuario si existe.
   */
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('idUsuario');
    this.idUsuario = idParam ? +idParam : null;

    if (this.idUsuario) {
      this.cargarUsuario(this.idUsuario);
    }
  }

  /**
   * @method cargarUsuario
   * @description 
   * Carga los datos del usuario desde el servicio.
   * @param {number} idUsuario - ID del usuario a modificar.
   */
  cargarUsuario(idUsuario: number): void {
    this.usuariosService.buscarUsuarioPorId(idUsuario).subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
      }
    });
  }

  /**
   * @method onSubmit
   * @description 
   * Envía la información actualizada del usuario al backend.
   */
  onSubmit(): void {
    if (this.usuario && this.idUsuario) {
      this.usuariosService.actualizarUsuario(this.idUsuario, this.usuario).subscribe({
        next: () => {
          console.log('Usuario actualizado correctamente');
          this.router.navigate(['/usuarios/gestion']); // Redirigir a la gestión de usuarios
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          alert('Error al actualizar usuario. Inténtalo de nuevo.');
        }
      });
    }
  }
}