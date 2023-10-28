import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';
import { validateEvents } from 'angular-calendar/modules/common/util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro-socios',
  templateUrl: './registro-socios.component.html',
  styleUrls: ['./registro-socios.component.scss']
})
export class RegistroSociosComponent implements OnInit {
  form: FormGroup;
  public Usuario: string | undefined | null = null;

  constructor(private formBuilder: FormBuilder, private adminsocis:AdminSociosServiceService,
    public snackBar: MatSnackBar, private AuthServiceService:AuthServiceService, private router:Router) {

    this.AuthServiceService.user$.subscribe((user) => {
      this.Usuario = user?.id_Usuario;
      console.log(this.Usuario)
    })
    this.form = this.formBuilder.group({
      pNombre: ['', Validators.required],
      pPApellido: ['', Validators.required],
      pSNombre: ['', Validators.required],
      pSApellido: ['', Validators.required],
      pNoDPI: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      pNoTelefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
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
  this.router.navigate(['/lista-sociso']);
}
  onSubmit() {

    if (this.form.valid) {
      this.adminsocis.guardarSocio(this.form.value).subscribe(
        (response) => {
          // console.log(response)

          if (response.ok) {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 2000,
            });

            this.router.navigate(['/lista-sociso']);
          } else  {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 2000,
            });
            }

          },
          (error) => {
            console.log(error);
            this.snackBar.open('Error al Intentar Guardar el Socio', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    }
}

