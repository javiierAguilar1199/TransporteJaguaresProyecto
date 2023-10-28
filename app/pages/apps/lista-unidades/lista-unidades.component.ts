import {
  Component,
  Inject,
  Optional,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DragDrop } from '@angular/cdk/drag-drop';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AdminUnidadesService } from 'src/app/services/admin-unidades.service';
import { MsjBorrarComponent } from '../msj-borrar/msj-borrar.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-lista-unidades',
  templateUrl: './lista-unidades.component.html',
  styleUrls: ['./lista-unidades.component.scss']
})
export class ListaUnidadesComponent  implements AfterViewInit{

  unidades: any= [];
  public Usuario: string | undefined | null = null;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
  Object.create(null);
searchText: any;
displayedColumns: string[] = [
  '#',
  'name',
  'apellido',
  'email',
  'mobile',
  'Accion',
];
dataSource = new MatTableDataSource(this.unidades);
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
  Object.create(null);

ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}

applyFilter(filterValue: string): void {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  constructor(
    private AdminUnidadesService: AdminUnidadesService,
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private MatDialog:MatDialog,
    public snackBar: MatSnackBar,
    private Router:Router,
    private auth:AuthServiceService

  ) {
    this.auth.user$.subscribe(async (user) => {
      this.Usuario = user?.id_Usuario;

    });
   this.dataUnidades();

  }

dataUnidades(){
  this.AdminUnidadesService.getUnidadesAct().subscribe((response) => {
    //console.log(response);
    this.unidades = response.response;
    this.dataSource = new MatTableDataSource(this.unidades);
    this.dataSource.paginator = this.paginator;
  });
}

  openDialog(){
    this.Router.navigate(['/registro-unidades']);

  }


actualizar(id: number){
  this.Router.navigate(['/actualizar-unidad', id]);


}


  borrar(id: number) {
    const msg = '¿Desea eliminar la Unidad?';
    const del = this.dialog.open(MsjBorrarComponent ,{
      data: { msg }
    });

    del.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.AdminUnidadesService.cambiarEstadoUnidad(id,this.Usuario).subscribe((response) => {

          if (response.ok) {

            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar', {
              duration: 2000,
            });

            this.dataUnidades();
          } else {
            this.snackBar.open('Error al intentar eliminarlo', 'Cerrar', {
              duration: 2000,
            });
          }
        });
      }
    });
  }


}
