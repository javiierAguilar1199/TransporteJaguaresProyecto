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
import { MsjBorrarComponent } from '../msj-borrar/msj-borrar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/services/auth-service.service';



import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';




@Component({
  selector: 'app-lista-sociso',
  templateUrl: './lista-sociso.component.html',
  styleUrls: ['./lista-sociso.component.scss'],
})
export class ListaSocisoComponent implements AfterViewInit {
  public Usuario: string | undefined | null = null;

  socios: any= [];
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
dataSource = new MatTableDataSource(this.socios);
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
  Object.create(null);


ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}

applyFilter(filterValue: string): void {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


constructor(
  private admindsocios: AdminSociosServiceService,
  public dialog: MatDialog,
  public datePipe: DatePipe,
  private MatDialog:MatDialog,
  private Router:Router,
  private auth:AuthServiceService,
  public snackBar: MatSnackBar,
) {


  this.auth.user$.subscribe(async (user) => {
  this.Usuario = user?.id_Usuario;
  // console.log(this.Usuario)
});

    this.dataSocios();
  }


  dataSocios(){
    this.admindsocios.getSociosActivos().subscribe((response) => {
      this.socios = response.response;
      this.dataSource = new MatTableDataSource(this.socios);
      this.dataSource.paginator = this.paginator;
    });

  }

  openDialog(){
    this.Router.navigate(['/registro-socios']); // Reemplaza '/registro-socios' con la ruta real de tu componente.

  }


actualizar(id: number){
  this.Router.navigate(['/actualizar-socio', id]);
console.log(id)

}

borrar(id:number) {
  const msg = '¿Desea eliminar El socio?';
  const del = this.dialog.open(MsjBorrarComponent ,{
    data: { msg }
  });

  del.afterClosed().subscribe((result) => {
    if (result === 'true') {
      this.admindsocios.deleteSoCIO(id,this.Usuario).subscribe((response) => {

        if (response.ok) {

          this.snackBar.open(response.pTransaccionMensaje, 'Cerrar', {
            duration: 2000,
          });

          this.dataSocios();
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
