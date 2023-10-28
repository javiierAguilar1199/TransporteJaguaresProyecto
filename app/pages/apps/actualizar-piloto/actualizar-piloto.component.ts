import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, UntypedFormBuilder, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';
import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';





@Component({
  selector: 'app-actualizar-piloto',
  templateUrl: './actualizar-piloto.component.html',
  styleUrls: ['./actualizar-piloto.component.scss']
})
export class ActualizarPilotoComponent implements OnInit{
  form: FormGroup;
  piloto: any= [];
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
    private adminPiloto:AdminiPilotosService

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
      pIdPiloto: [this.id],
    });

  }
   get f() {
    return this.form.controls;
  }

  regresar(){
    this.router.navigate(['/lista-pilotos']);
  }
  ngOnInit(): void {

    this.adminPiloto.getSocioID(this.id).subscribe((data) => {
      if (data.ok) {
        this.piloto= data.response
      //  console.log(this.piloto);
        this.form.get('pNombre')?.setValue(this.piloto[0].pNombre);
        this.form.get('pSNombre')?.setValue(this.piloto[0].pSNombre);
        this.form.get('pPApellido')?.setValue(this.piloto[0].pPApellido);
        this.form.get('pSApellido')?.setValue(this.piloto[0].pSApellido);
        this.form.get('pNoDPI')?.setValue(this.piloto[0].pNoDPI);
        this.form.get('pNoTelefono')?.setValue(this.piloto[0].pNoTelefono);
        this.form.get('pDireccion')?.setValue(this.piloto[0].pDireccion);
      }
    });




  }
  onSubmit() {
    if (this.form.valid) {
      this.adminPiloto.AcutalizarPiloto (this.form.value).subscribe(
        (response) => {

          if (response.ok) {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 2000,
            });
            this.router.navigate(['/lista-pilotos']);

          } else  {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 2000,
            });
            }

          },
          (error) => {
            console.log(error);
            this.snackBar.open('Error al Intentar Actualizar el Piloto', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    }
  }



