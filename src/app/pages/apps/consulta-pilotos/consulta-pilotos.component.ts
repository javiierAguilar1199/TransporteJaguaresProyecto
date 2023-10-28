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
import { AuthServiceService } from 'src/app/services/auth-service.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,

} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';
import { MsjBorrarComponent } from '../msj-borrar/msj-borrar.component';




@Component({
  selector: 'app-consulta-pilotos',
  templateUrl: './consulta-pilotos.component.html',
  styleUrls: ['./consulta-pilotos.component.scss'],
})
export class ConsultaPilotosComponent implements AfterViewInit {
  pilotos: any= [];
  form: FormGroup;
  public Usuario: string | undefined | null = null;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
  Object.create(null);
searchText: any;
displayedColumns: string[] = [
  '#',
  'name',
  'apellido',
  'email',
  'direccion',
  'mobile',
];


dataSource = new MatTableDataSource(this.pilotos);
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
  Object.create(null);

ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}

applyFilter(filterValue: string): void {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  constructor(
    private AdminiPilotosService: AdminiPilotosService,
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private MatDialog:MatDialog,
    private Router:Router,
    public snackBar: MatSnackBar,
    private auth:AuthServiceService,
    private fb: UntypedFormBuilder,

  ) {


    this.auth.user$.subscribe(async (user) => {
      this.Usuario = user?.id_Usuario;
    });

    this.form = this.fb.group({
      pIdPiloto: ['', Validators.required],
      pFechaInicio: ['', Validators.required],
      pFechaFin: ['', Validators.required]

    });

    this.loadPilotosData();


  }

  get f() {
    return this.form.controls;
  }

  loadPilotosData() {
    this.AdminiPilotosService.getPilotosAct().subscribe((response) => {
      this.pilotos = response.response;
      this.dataSource = new MatTableDataSource(this.pilotos);
      this.dataSource.paginator = this.paginator;
    });
  }


  async ngOnInit() {

    const genPilo = await this.AdminiPilotosService.getPilotos().toPromise();
    this.pilotos = genPilo.response
    console.log(this.pilotos)

  }


  onSubmit() {
  }

  openDialog(){
    this.Router.navigate(['/registro-pilotos']); // Reemplaza '/registro-socios' con la ruta real de tu componente.
  }

actualizar(id: number){
  this.Router.navigate(['/actualizar-piloto', id]);
console.log(id)
}
  borrar(id: number) {
    const msg = '¿Desea eliminar Piloto?';
    const del = this.dialog.open(MsjBorrarComponent ,{
      data: { msg }
    });

    del.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.AdminiPilotosService.cambiarEstadPiloto(id,this.Usuario).subscribe((response) => {
      console.log(response)
          if (response.ok) {
            console.log(response);
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar', {
              duration: 2000,

            });
            this.loadPilotosData();


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
