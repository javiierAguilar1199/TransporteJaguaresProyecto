import {
  Component,
  Inject,
  Optional,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AdminHorariosService } from 'src/app/services/admin-horarios.service';
import {  Router } from '@angular/router';
import { MsjBorrarComponent } from '../msj-borrar/msj-borrar.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-lista-horarios',
  templateUrl: './lista-horarios.component.html',
  styleUrls: ['./lista-horarios.component.scss']
})
export class ListaHorariosComponent  implements AfterViewInit{

  horarios: any= [];
  public Usuario: string | undefined | null = null;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
  Object.create(null);
searchText: any;
displayedColumns: string[] = [
  '#',
  'codigoUnidad',
  'fecha',
  'hora',
  'nombresocio',
  'planta',
  'Accion'
];
dataSource = new MatTableDataSource(this.horarios);
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
  Object.create(null);

ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}

applyFilter(filterValue: string): void {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  constructor(
    private AdminHorariosSe:AdminHorariosService,
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private MatDialog:MatDialog,
    private router:Router,
    public snackBar: MatSnackBar,
    private Router:Router,
    private auth:AuthServiceService
  ) {

    this.auth.user$.subscribe(async (user) => {
      this.Usuario = user?.id_Usuario;

    });
this.dataHorarios();

  }

dataHorarios(){
  this.AdminHorariosSe.getHoraraiosAct().subscribe((response) => {
    this.horarios = response.response;
    this.dataSource = new MatTableDataSource(this.horarios);
    this.dataSource.paginator = this.paginator;
  });


}


actualizar(id: number){
  this.router.navigate(['/actualizar-horario', id]);

}

openDialog(){
  this.router.navigate(['/registro-horarios']); // Reemplaza '/registro-socios' con la ruta real de tu componente.

}
  borrar(id: number) {

    const msg = '¿Desea eliminar el Horario?';
    const del = this.dialog.open(MsjBorrarComponent ,{
      data: { msg }
    });

    del.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.AdminHorariosSe.cambiarEstadoHorario(id,this.Usuario).subscribe((response) => {

          if (response.ok) {

            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar', {
              duration: 2000,
            });

            this.dataHorarios();
          } else {
            console.log(response)
            this.snackBar.open('Error al intentar eliminarlo', 'Cerrar', {
              duration: 2000,
            });
          }
        });
      }
    });
  }




}
