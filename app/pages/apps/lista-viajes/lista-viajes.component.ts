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
import { Router } from '@angular/router';
import { AdminViajesService } from 'src/app/services/admin-viajes.service';
import { MsjBorrarComponent } from '../msj-borrar/msj-borrar.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.component.html',
  styleUrls: ['./lista-viajes.component.scss']
})
export class ListaViajesComponent
 implements AfterViewInit {
  public Usuario: string | undefined | null = null;

  viajes: any= [];
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
  Object.create(null);
searchText: any;
displayedColumns: string[] = [
  'name',
  'fecha',
  'hora',
  'Entrega',
  'municipio',
  'Departamento',
  'Piloto',
  'codigouni',
  'action',
];
dataSource = new MatTableDataSource(this.viajes);
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
  Object.create(null);

ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}

applyFilter(filterValue: string): void {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  constructor(
    private AdminPiloviaje: AdminViajesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private MatDialog:MatDialog,
    private auth:AuthServiceService,
    private router:Router
  ) {


    this.auth.user$.subscribe(async (user) => {
      this.Usuario = user?.id_Usuario;
    });


    this.loadviajesData();


  }

  loadviajesData(){
    this.AdminPiloviaje.getViajesAct().subscribe((response) => {
      console.log(response);
      this.viajes = response.response;
      this.dataSource = new MatTableDataSource(this.viajes);
      this.dataSource.paginator = this.paginator;
    });
  }


  openDialog(){
    this.router.navigate(['/bitacora-viaje']); // Reemplaza '/registro-socios' con la ruta real de tu componente.

  }



actualizar(id: number){
  this.router.navigate(['/actualizar-bitacora', id]);
console.log(id)
}
  borrar(id: number) {
    const msg = '¿Desea eliminar la Bitácora?';
    const del = this.dialog.open(MsjBorrarComponent ,{
      data: { msg }
    });

    del.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.AdminPiloviaje.cambiarEstadoViaje(id,this.Usuario).subscribe((response) => {
      console.log(response)
          if (response.ok) {
            console.log(response);
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar', {
              duration: 2000,

            });
            this.loadviajesData();


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
