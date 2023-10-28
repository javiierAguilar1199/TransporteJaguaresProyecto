import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUsuariosService } from 'src/app/services/admin-usuarios.service';
import { validateEvents } from 'angular-calendar/modules/common/util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-usr',
  templateUrl: './admin-usr.component.html',
  styleUrls: ['./admin-usr.component.scss']
})

export class AdminUsrComponent implements OnInit {
  form: FormGroup;
  public Usuario: string | undefined | null = null;
  public Roles: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
     private adminUsr:AdminUsuariosService,
     public snackBar: MatSnackBar,
     private AuthServiceService:AuthServiceService,
     private catalogo:CatalogoService,
     private router:Router
     )
      {

    this.AuthServiceService.user$.subscribe((user) => {
      this.Usuario = user?.id_Usuario;

    })
    this.form = this.formBuilder.group({
      pIdUsuario:['',Validators.required],
      pPNombre: ['', Validators.required],
      pPApellido: ['', Validators.required],
      SNombre: ['', Validators.required],
      pSApellido: ['', Validators.required],
      pNoDPI: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      pNoTelefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      pDireccion: ['', Validators.required],
      pCorreo: [null, Validators.required],
      pContrasenia:['',Validators.required],
      pIdRol:['',Validators.required],
      pOrganizacion:[1],
      pIdUsuarioCreacion:[this.Usuario]
    });

  }
  get f() {
    return this.form.controls;
  }

regresar(){
  this.router.navigate(['/lista-usuarios']);
}

   async ngOnInit() {
    const gen = await this.catalogo.getRoles().toPromise();
    this.Roles = gen.response

  }

  onSubmit() {

    if (this.form.valid) {
      this.adminUsr.guardarUsuario(this.form.value).subscribe(
        (response) => {
          // console.log(response)

          if (response.ok) {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 2000,
            });

            this.router.navigate(['/lista-usuarios']);

          } else  {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 2000,
            });
            }

          },
          (error) => {
            console.log(error);
            this.snackBar.open('Error al Intentar Guardar el Usuario', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    }
}


