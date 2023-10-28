
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';
import { validateEvents } from 'angular-calendar/modules/common/util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registro-pilotos',
  templateUrl: './registro-pilotos.component.html',
  styleUrls: ['./registro-pilotos.component.scss']
})
export class RegistroPilotosComponent implements OnInit {
  form: FormGroup;
  public Usuario: string | undefined | null = null;

  constructor(
    private formBuilder: FormBuilder,
     private adminPilo:AdminiPilotosService,
     public snackBar: MatSnackBar,
     private AuthServiceService:AuthServiceService,
      private router:Router) {

    this.AuthServiceService.user$.subscribe((user) => {
      this.Usuario = user?.id_Usuario;
      console.log(this.Usuario)
    })
    //Arma el Json para Enviar la peticion
    this.form = this.formBuilder.group({
      pNombre: ['', Validators.required],
      pPApellido: ['', Validators.required],
      pSNombre: ['',Validators.required],
      pSApellido: ['',Validators.required],
      pNoDPI: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13),Validators.pattern(/^[0-9]+$/)]],
      pNoTelefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8),Validators.pattern(/^[0-9]+$/)]],
      pDireccion: ['', Validators.required],
      pIdUsuario:[this.Usuario]
    });

  }
  get f() {
    return this.form.controls;
  }

   async ngOnInit() {
  }

regresar(){
  this.router.navigate(['/lista-pilotos']);


}

  //Guarda El Piloto
  onSubmit() {

    if (this.form.valid) {
      this.adminPilo.guardarPiloto(this.form.value).subscribe(
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
            this.snackBar.open('Error al Intentar Guardar El piloto', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    }
}



