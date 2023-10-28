import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxPermissionsModule } from 'ngx-permissions';

import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgScrollbarModule } from 'ngx-scrollbar';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Chat
import { AppChatComponent } from './chat/chat.component';
//Contact
import { AppContactDialogContentComponent } from './contact/contact.component';
import { AppContactComponent } from './contact/contact.component';
//Courses
import { AppCoursesComponent } from './courses/courses.component';
import { AppCourseDetailComponent } from './courses/course-detail/course-detail.component';

//Notes
import { AppNotesComponent } from './notes/notes.component';
//Todo
import { AppTodoComponent } from './todo/todo.component';
// Permission
import { AppPermissionComponent } from './permission/permission.component';
//Mailbox
import {
  ListingComponent,
  ListingDialogDataExampleDialogComponent,
} from './email/listing/listing.component';
import { DetailComponent } from './email/detail/detail.component';
import { AppEmailComponent } from './email/email.component';

//Taskboard
import { AppTaskboardComponent } from './taskboard/taskboard.component';
import { TaskDialogComponent } from './taskboard/task-dialog.component';
import { OkAppTaskComponent } from './taskboard/ok-task/ok-task.component';
import { DeleteAppTaskComponent } from './taskboard/delete-task/delete-task.component';

//Calendar
import { AppFullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { CalendarDialogComponent } from './fullcalendar/fullcalendar.component';
import { CalendarFormDialogComponent } from './fullcalendar/calendar-form-dialog/calendar-form-dialog.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppEmployeeComponent } from './employee/employee.component';
import { AppEmployeeDialogContentComponent } from './employee/employee.component';
import { AppAddEmployeeComponent } from './employee/add/add.component';


import { AppsRoutes } from './apps.routing';
import { MatNativeDateModule } from '@angular/material/core';
import {
  AppTicketlistComponent,
  AppTicketDialogContentComponent,
} from './ticketlist/ticketlist.component';

//Invoice
import { AppInvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { AppInvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
import { AppAddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { AppEditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
import { OkDialogComponent } from './invoice/edit-invoice/ok-dialog/ok-dialog.component';
import { AddedDialogComponent } from './invoice/add-invoice/added-dialog/added-dialog.component';

// blog
import { AppBlogsComponent } from './blogs/blogs.component';
import { AppBlogDetailsComponent } from './blogs/details/details.component';
import { BitacoraViajeComponent } from './bitacora-viaje/bitacora-viaje.component';
import { ListaViajesComponent } from './lista-viajes/lista-viajes.component';
import { RegistroPilotosComponent } from './registro-pilotos/registro-pilotos.component';
import { ListaPilotosComponent } from './lista-pilotos/lista-pilotos.component';
import { RegistroUnidadesComponent } from './registro-unidades/registro-unidades.component';
import { ListaUnidadesComponent } from './lista-unidades/lista-unidades.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { RegistroHorariosComponent } from './registro-horarios/registro-horarios.component';
import { ListaHorariosComponent } from './lista-horarios/lista-horarios.component';
import { RegistroSociosComponent } from './registro-socios/registro-socios.component';
import { ListaSocisoComponent } from './lista-sociso/lista-sociso.component';
import { GeneraPDFComponent } from './genera-pdf/genera-pdf.component';
import { GeneraPdfSociosComponent } from './genera-pdf-socios/genera-pdf-socios.component';
import { AdminUsrComponent } from './admin-usr/admin-usr.component';
import { PdfSocioComponent } from './pdf-socio/pdf-socio.component';
import { MsjBorrarComponent } from './msj-borrar/msj-borrar.component';
import { ActualizarSocioComponent } from './actualizar-socio/actualizar-socio.component';
import { ActualizarPilotoComponent } from './actualizar-piloto/actualizar-piloto.component';
import { ActualizarUnidadComponent } from './actualizar-unidad/actualizar-unidad.component';
import { ActualizarHorarioComponent } from './actualizar-horario/actualizar-horario.component';
import { ActualizarBitacoraComponent } from './actualizar-bitacora/actualizar-bitacora.component';
import { ActualizarUsuarioComponent } from './actualizar-usuario/actualizar-usuario.component';
import { ActualizarUsrComponent } from './actualizar-usr/actualizar-usr.component';
import { PdfComponent } from './pdf/pdf.component';
import { GeneraPDfUnidadesComponent } from './genera-pdf-unidades/genera-pdf-unidades.component';
import { PdfUnidadesComponent } from './pdf-unidades/pdf-unidades.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule,
    RouterModule.forChild(AppsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    NgApexchartsModule,
    TablerIconsModule.pick(TablerIcons),
    DragDropModule,
    NgxPaginationModule,
    HttpClientModule,
    AngularEditorModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatNativeDateModule,
    NgScrollbarModule,
  ],
  exports: [TablerIconsModule],
  declarations: [
    AppChatComponent,
    AppPermissionComponent,
    AppNotesComponent,
    AppTodoComponent,
    AppTaskboardComponent,
    TaskDialogComponent,
    OkAppTaskComponent,
    DeleteAppTaskComponent,
    ListingDialogDataExampleDialogComponent,
    ListingComponent,
    DetailComponent,
    AppEmailComponent,
    AppFullcalendarComponent,
    CalendarDialogComponent,
    CalendarFormDialogComponent,
    AppTicketlistComponent,
    AppTicketDialogContentComponent,
    AppContactComponent,
    AppContactDialogContentComponent,
    AppCoursesComponent,
    AppCourseDetailComponent,
    AppEmployeeComponent,
    AppEmployeeDialogContentComponent,
    AppAddEmployeeComponent,
    AppInvoiceListComponent,
    AppInvoiceViewComponent,
    AppAddInvoiceComponent,
    AppEditInvoiceComponent,
    AddedDialogComponent,
    OkDialogComponent,
    AppBlogsComponent,
    AppBlogDetailsComponent,
    BitacoraViajeComponent,
    ListaViajesComponent,
    RegistroPilotosComponent,
    ListaPilotosComponent,
    RegistroUnidadesComponent,
    ListaUnidadesComponent,
    ListaUsuariosComponent,
    RegistroHorariosComponent,
    ListaHorariosComponent,
    RegistroSociosComponent,
    ListaSocisoComponent,
    GeneraPDFComponent,
    GeneraPdfSociosComponent,
    AdminUsrComponent,
    PdfSocioComponent,
    MsjBorrarComponent,
    ActualizarSocioComponent,
    ActualizarPilotoComponent,
    ActualizarUnidadComponent,
    ActualizarHorarioComponent,
    ActualizarBitacoraComponent,
    ActualizarUsuarioComponent,
    ActualizarUsrComponent,
    PdfComponent,
    GeneraPDfUnidadesComponent,
    PdfUnidadesComponent,

  ],
  providers: [DatePipe],
})
export class AppsModule {}
