import { Routes } from '@angular/router';

// Importación de los componentes relacionados con la gestión de usuarios
import { LoginComponentUsers } from './app-login-usuarios/app-login.component';
import { GestionComponentUsers } from './app-login-usuarios/app-gestion/app-gestion.component';
import { GestionListaComponentUsers } from './app-login-usuarios/app-gestion/app-gestion-lista/app-gestion-lista.component';
import { ModifyComponentUsers } from './app-login-usuarios/app-modify/app-modify.component';
import { RegisterComponentUsers } from './app-login-usuarios/app-register/app-register.component';

// Importación de los componentes relacionados con la gestión de clientes
import { LoginComponentClientes } from './app-login-clientes/app-login.component';
import { AppClientsListComponent } from './app-login-clientes/app-gestion/app-gestion.component';
import { AppRegisterClientComponent } from './app-login-clientes/app-register/app-register.component';
import { ModifyClientsComponent } from './app-login-clientes/app-modify/app-modify.component';

// Importación de los componentes relacionados con la gestión de vehículos
import { LoginComponentVehiculos } from './app-login-vehiculos/app-login.component';
import { GestionVehiculosComponent } from './app-login-vehiculos/app-gestion/app-gestion.component';
import { ModifyComponentVehiculos } from './app-login-vehiculos/app-modify/app-modify.component';
import { RegistroComponentVehiculos } from './app-login-vehiculos/app-register/app-register.component';

// Importación de los componentes adicionales de la aplicación
import { SampleCustomerComponent } from './app-promocion-vehiculos/app-promocion.component';
import { LoginComponentOrdenCompra } from './app-orden-compra/app-login.component';
import { AppOrdencComponent } from './app-orden-compra/app-ordenc/app-ordenc.component';
import { AppImpuestosComponent } from './app-impuestos/app-gestion/app-impuestos.component';
import { LoginComponentImpuestos } from './app-impuestos/app-login-impuestos.component';
import { AgregarComponentImpuestos } from './app-impuestos/app-register/app-register-impuesto.component';
import { ModifyComponentImpuestos } from './app-impuestos/app-modify/app-modify-impuestos.component';
import { LoginComponentDescuentos } from './app-descuentos/app-login-descuentos.component';
import { AppDescuentosComponent } from './app-descuentos/app-gestion/app-impuestos.component';

/**
 * Configuración de rutas de la aplicación
 */
const routeConfig: Routes = [
  {
    path: 'usuarios', // Ruta para el inicio de sesión de usuarios
    component: LoginComponentUsers
  },
  {
    path: 'usuarios/gestion', // Ruta para la gestión de usuarios
    component: GestionComponentUsers
  },
  {
    path: 'usuarios/register', // Ruta para el registro de nuevos usuarios
    component: RegisterComponentUsers
  },
  {
    path: 'usuarios/list', // Ruta para la lista de usuarios
    component: GestionListaComponentUsers
  },
  {
    path: 'usuarios/modify/:idUsuario', // Ruta para modificar un usuario por su ID
    component: ModifyComponentUsers
  },
  {
    path: 'clientes', // Ruta para el inicio de sesión de clientes
    component: LoginComponentClientes
  },
  {
    path: 'clientes/gestion', // Ruta para la gestión de clientes
    component: AppClientsListComponent
  },
  {
    path: 'clientes/register', // Ruta para el registro de clientes
    component: AppRegisterClientComponent
  },
  {
    path: 'clientes/modify/:idCliente', // Ruta para modificar un cliente por su ID
    component: ModifyClientsComponent
  },
  {
    path: 'vehiculos', // Ruta para el inicio de sesión de vehículos
    component: LoginComponentVehiculos
  },
  {
    path: 'vehiculos/gestion', // Ruta para la gestión de vehículos
    component: GestionVehiculosComponent
  },
  {
    path: 'vehiculos/modify/:idVehiculo', // Ruta para modificar un vehículo por su ID
    component: ModifyComponentVehiculos
  },
  {
    path: 'vehiculos/register', // Ruta para registrar un vehículo nuevo
    component: RegistroComponentVehiculos
  },
  {
    path: '', // Ruta por defecto de la aplicación
    component: SampleCustomerComponent
  },
  {
    path: 'ordenCompra', // Ruta para el inicio de sesión de órdenes de compra
    component: LoginComponentOrdenCompra
  },
  {
    path: 'ordenCompra/venta', // Ruta para la gestión de órdenes de compra
    component: AppOrdencComponent
  },
  {
    path: 'impuestos', // Ruta para la gestión de impuestos
    component: LoginComponentImpuestos
  },
  {
    path: 'impuestos/gestion',
    component: AppImpuestosComponent
  },
  {
    path: 'impuestos/register',
    component: AgregarComponentImpuestos
  },
  {
    path: 'impuestos/modify/:idImpuesto',
    component: ModifyComponentImpuestos
  },
  {
    path: 'descuentos', // Ruta para la gestión de descuentos
    component: LoginComponentDescuentos
  },
  {
    path: 'descuentos/gestion',
    component: AppDescuentosComponent
  },
  {
    path: 'descuentos/modify/:idDescuento',
    component: ModifyComponentImpuestos
  },
  {
    path: 'descuentos/register',
    component: AgregarComponentImpuestos
  }
];

export default routeConfig;
