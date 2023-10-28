import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { RegistroUnidadesComponent } from './pages/apps/registro-unidades/registro-unidades.component';
import { ListaUnidadesComponent } from './pages/apps/lista-unidades/lista-unidades.component';
import { ListaHorariosComponent } from './pages/apps/lista-horarios/lista-horarios.component';
import { ListaPilotosComponent } from './pages/apps/lista-pilotos/lista-pilotos.component';
import { ListaViajesComponent } from './pages/apps/lista-viajes/lista-viajes.component';
import { RegistroPilotosComponent } from './pages/apps/registro-pilotos/registro-pilotos.component';
import { RegistroSociosComponent } from './pages/apps/registro-socios/registro-socios.component';
import { AppBoxedLoginComponent } from './pages/authentication/boxed-login/boxed-login.component';
import { ListaSocisoComponent } from './pages/apps/lista-sociso/lista-sociso.component';
import { RegistroHorariosComponent } from './pages/apps/registro-horarios/registro-horarios.component';
import { BitacoraViajeComponent } from './pages/apps/bitacora-viaje/bitacora-viaje.component';
import { ListaUsuariosComponent } from './pages/apps/lista-usuarios/lista-usuarios.component';
import { GeneraPDFComponent } from './pages/apps/genera-pdf/genera-pdf.component';
import { AdminUsrComponent } from './pages/apps/admin-usr/admin-usr.component';
import { ActualizarSocioComponent } from './pages/apps/actualizar-socio/actualizar-socio.component';
import { ActualizarPilotoComponent } from './pages/apps/actualizar-piloto/actualizar-piloto.component';
import { ActualizarUnidadComponent } from './pages/apps/actualizar-unidad/actualizar-unidad.component';
import { ActualizarHorarioComponent } from './pages/apps/actualizar-horario/actualizar-horario.component';
import { ActualizarBitacoraComponent } from './pages/apps/actualizar-bitacora/actualizar-bitacora.component';
import { ActualizarUsuarioComponent } from './pages/apps/actualizar-usuario/actualizar-usuario.component';
import { ActualizarUsrComponent } from './pages/apps/actualizar-usr/actualizar-usr.component';
import { PdfSocioComponent } from './pages/apps/pdf-socio/pdf-socio.component';
import { GeneraPdfSociosComponent } from './pages/apps/genera-pdf-socios/genera-pdf-socios.component';
import { PdfComponent } from './pages/apps/pdf/pdf.component';
import { PdfUnidadesComponent } from './pages/apps/pdf-unidades/pdf-unidades.component';
import { GeneraPDfUnidadesComponent } from './pages/apps/genera-pdf-unidades/genera-pdf-unidades.component';
import { AuthGuard } from './pages/apps/guards/auth.guard';
import { encargadoSecre } from './pages/apps/guards/encargadoSecre.guard';
import { encMoniSecreGuard } from './pages/apps/guards/enc-moni-secre.guard';
import { encargadoGuard } from './pages/apps/guards/encargado.guard';
import { moniencar } from './pages/apps/guards/moni-encar.guard';

const routes: Routes = [
  {
    path: '',
    component: AppBoxedLoginComponent
    // redirectTo: '/authentication/boxed-login',
    // pathMatch: 'full',
  },

  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    // canActivate: [AuthGuard],
    children: [
      // {
      //   path: '',
      //   redirectTo: '/dashboards/dashboard1',
      //  pathMatch: 'full',
      // },
      {
        path: 'starter',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./pages/dashboards/dashboards.module').then(
            (m) => m.DashboardsModule
          ),
      },
      // {
      //   path: 'ui-components',
      //   loadChildren: () =>
      //     import('./pages/ui-components/ui-components.module').then(
      //       (m) => m.UicomponentsModule
      //     ),
      // },
      {
        path: 'forms',
        loadChildren: () =>
          import('./pages/forms/forms.module').then((m) => m.FormModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./pages/charts/charts.module').then((m) => m.ChartsModule),
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./pages/apps/apps.module').then((m) => m.AppsModule),
      },
      {
         path: 'lista-sociso',
        canActivate: [encargadoGuard],
       component: ListaSocisoComponent,
       },

      {
        path: 'registro-unidades',
        canActivate: [encargadoSecre],
        component: RegistroUnidadesComponent,
      },

      {
        path: 'lista-unidades',
        canActivate: [encargadoSecre],
        component: ListaUnidadesComponent,
      },

      {
        path: 'lista-horarios',
        canActivate: [moniencar],
        component: ListaHorariosComponent,
      },
      {
        path: 'lista-pilotos',
        canActivate: [encargadoSecre],
        component: ListaPilotosComponent,
      },

      {
        canActivate: [moniencar],
        path: 'lista-viajes',
        component: ListaViajesComponent,
      },

      {
        path: 'registro-pilotos',
        canActivate: [encargadoSecre],
        component: RegistroPilotosComponent,
      },

      {
        path: 'registro-socios',
        canActivate: [encargadoGuard],
        component: RegistroSociosComponent,
      },
      {
        path: 'admin-usr',
        canActivate: [encMoniSecreGuard],
        component: AdminUsrComponent,
      },
      {
       path: 'registro-horarios',

         canActivate: [moniencar],
        component: RegistroHorariosComponent,
       },

      {
        path: 'bitacora-viaje',
        canActivate: [moniencar],
        component: BitacoraViajeComponent,
      },

      {
        path: 'lista-usuarios',
        canActivate: [encargadoGuard],
        component: ListaUsuariosComponent,
      },


      {
        path: 'actualizar-socio/:id',
        component: ActualizarSocioComponent,
        canActivate: [encargadoGuard],
        data: {
          title: 'Actualizar Socio',
          urls: [
            { title: 'Socios', url: '/dashboard' },
            { title: 'Actualizar Socio' },
          ],
        },
      },

      {
        path: 'pdf-socio/:id/:tipoMes',
        component: PdfSocioComponent,
        data: {
          title: 'Actualizar Socio',
          urls: [
            { title: 'Socios', url: '/dashboard' },
            { title: 'Actualizar Socio' },
          ],
        },
      },

      {
        path: 'pdf/:id/:tipoMes',
        component: PdfComponent,
        data: {
          title: 'Actualizar Socio',
          urls: [
            { title: 'Socios', url: '/dashboard' },
            { title: 'Actualizar Socio' },
          ],
        },
      },

      {
        path: 'pdf-unidades/:id/:tipoMes',
        component: PdfUnidadesComponent,
        data: {
          title: 'Actualizar Socio',
          urls: [
            { title: 'Socios', url: '/dashboard' },
            { title: 'Actualizar Socio' },
          ],
        },
      },
      {
        path: 'actualizar-unidad/:id',
        component: ActualizarUnidadComponent,
        canActivate: [encargadoSecre],
        data: {
          title: 'Actualizar Unidad',
          urls: [
            { title: 'Unidad', url: '/dashboard' },
            { title: 'Actualizar Unidad' },
          ],
        },
      },

      {
        path: 'actualizar-horario/:id',
        component: ActualizarHorarioComponent,
        canActivate: [moniencar],
        data: {
          title: 'Actualizar Horario',
          urls: [
            { title: 'Horario', url: '/dashboard' },
            { title: 'Actualizar Horario' },
          ],
        },
      },

      {
        path: 'actualizar-bitacora/:id',
        component: ActualizarBitacoraComponent,
        canActivate: [moniencar],
        data: {
          title: 'Actualizar Bitacora',
          urls: [
            { title: 'Bitacora', url: '/dashboard' },
            { title: 'Actualizar Bitacora' },
          ],
        },
      },


      {
      path: 'actualizar-usuario/:id',
      component: ActualizarUsuarioComponent,
      canActivate: [encargadoGuard],
      data: {
        title: 'Actualizar Usuario',
        urls: [
          { title: 'Usuarios', url: '/dashboard' },
          { title: 'Actualizar Usuario' },
        ],
      },
    },
    {
      path: 'actualizar-usr/:id',
      component: ActualizarUsrComponent,
      canActivate: [encMoniSecreGuard],
      data: {
        title: 'Actualizar Usuario',
        urls: [
          { title: 'Usuarios', url: '/dashboard' },
          { title: 'Actualizar Usuario' },
        ],
      },
    },


      {
        path: 'actualizar-piloto/:id',
        component: ActualizarPilotoComponent,
        canActivate: [encargadoSecre],
        data: {
          title: 'Actualizar Piloto',
          urls: [
            { title: 'Pilotos', url: '/dashboard' },
            { title: 'Actualizar Piloto' },
          ],
        },
      },
      {
        path: 'lista-viajes',
        component: ListaViajesComponent,
        canActivate: [moniencar],
      },

      {
        path: 'genera-pdf',
        component: GeneraPDFComponent,
      },

      {
        path: 'genera-pdf-socios',
        component: GeneraPdfSociosComponent,
      },
      {
        path: 'genera-pdf-unidades',
        component: GeneraPDfUnidadesComponent,
      },
      // {
      //   path: 'widgets',
      //   loadChildren: () =>
      //     import('./pages/widgets/widgets.module').then((m) => m.WidgetsModule),
      // },
      {
        path: 'tables',
        loadChildren: () =>
          import('./pages/tables/tables.module').then((m) => m.TablesModule),
      },
      // {
      //   path: 'theme-pages',
      //   loadChildren: () =>
      //     import('./pages/theme-pages/theme-pages.module').then(
      //       (m) => m.ThemePagesModule
      //     ),
      // },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path: 'landingpage',
        loadChildren: () =>
          import('./pages/theme-pages/landingpage/landingpage.module').then(
            (m) => m.LandingPageModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
