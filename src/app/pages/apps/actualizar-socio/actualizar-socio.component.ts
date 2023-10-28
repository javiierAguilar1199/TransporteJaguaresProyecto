import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';



@Component({
  selector: 'app-actualizar-socio',
  templateUrl: './actualizar-socio.component.html',
  styleUrls: ['./actualizar-socio.component.scss']
})
export class ActualizarSocioComponent implements OnInit{
  form: FormGroup;
  socios: any= [];
  public usuario: string |undefined | null = null;

  id: number = 0;

  //Para recuperar valores


  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    public serviceCatalogo: CatalogoService,
    private Authser: AuthServiceService,
    private adminSocio: AdminSociosServiceService,

  ) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.Authser.user$.subscribe((user) => {
      this.usuario = user?.id_Usuario;
    });
    this.form = this.fb.group({
      pNombre: ['', Validators.required],
      pPApellido: ['', Validators.required],
      pSNombre: ['', Validators.required],
      pSApellido: ['', Validators.required],
      pNoDPI: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      pNoTelefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      pDireccion: ['', Validators.required],
      pIdUsuario:[this.usuario],
      pIdSocio: [this.id],
    });

  }
   get f() {
    return this.form.controls;
  }

  ngOnInit(): void {

    this.adminSocio.getSocioID(this.id).subscribe((data) => {
      if (data.ok) {
        this.socios= data.response
  //    console.log(this.socios);
        this.form.get('pNombre')?.setValue(this.socios[0].pNombre);
        this.form.get('pSNombre')?.setValue(this.socios[0].pSNombre);
        this.form.get('pPApellido')?.setValue(this.socios[0].pPApellido);
        this.form.get('pSApellido')?.setValue(this.socios[0].pSApellido);
        this.form.get('pNoDPI')?.setValue(this.socios[0].pNoDPI);
        this.form.get('pNoTelefono')?.setValue(this.socios[0].pNoTelefono);
        this.form.get('pDireccion')?.setValue(this.socios[0].pDireccion);
      }
    });

  }
regresar(){
  this.router.navigate(['/lista-sociso']);
}

  onSubmit() {
    if (this.form.valid) {
      this.adminSocio.actualizarSocio(this.form.value).subscribe(
        (response) => {

          if (response.ok) {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 3000,
            });
            this.router.navigate(['/lista-sociso']);

          } else  {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 3000,
            });
            }

          },
          (error) => {
            console.log(error);
            this.snackBar.open('Error al Intentar Actualizar el Socio', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    }
  }


