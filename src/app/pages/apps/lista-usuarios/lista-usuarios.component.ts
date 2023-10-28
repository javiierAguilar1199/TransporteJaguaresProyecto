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
import { AdminUsuariosService } from 'src/app/services/admin-usuarios.service';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements AfterViewInit {
  public Usuario: string | undefined | null = null;

  Usuarios: any= [];
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
  Object.create(null);

searchText: any;
displayedColumns: string[] = [
  '#',
  'name',
  'apellido',
  'email',
  'mobile',
  'correo',
  'direccion',
  'action',
];
dataSource = new MatTableDataSource(this.Usuarios);
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
  Object.create(null);


ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}
ngOnInit(): void {
  this.auth.user$.subscribe(async (user) => {
  this.Usuario = user?.id_Usuario;

}
)}

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
    public adminUSr: AdminUsuariosService,
  ) {
  this.datauser();
  }
datauser(){
  this.adminUSr.getUsuarios().subscribe((response) => {
    this.Usuarios = response.response;
    this.dataSource = new MatTableDataSource(this.Usuarios);
    this.dataSource.paginator = this.paginator;
  });

}

  openDialog(){
    this.Router.navigate(['/admin-usr']); // Reemplaza '/registro-socios' con la ruta real de tu componente.

  }


actualizar(id: string){
  this.Router.navigate(['/actualizar-usuario', id]);


}

borrar(id:string) {
  const msg = '¿Desea eliminar el Usuario?';
  const del = this.dialog.open(MsjBorrarComponent ,{
    data: { msg }
  });

  del.afterClosed().subscribe((result) => {
    if (result === 'true') {
      this.adminUSr.deleteUsr(id,this.Usuario).subscribe((response) => {
   // console.log(response)
        if (response.ok) {
         // console.log(response);
          this.snackBar.open(response.pTransaccionMensaje, 'Cerrar', {
            duration: 2000,
          });
          this.datauser();
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
