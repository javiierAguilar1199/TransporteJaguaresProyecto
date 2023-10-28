import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AdminUsuariosService } from 'src/app/services/admin-usuarios.service';
import { validateEvents } from 'angular-calendar/modules/common/util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.scss']
})

export class ActualizarUsuarioComponent implements OnInit {
  form: FormGroup;
  usuarios: any= [];

  public Id: '';
  public Usuario: string | undefined | null = null;
  public Roles: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
     private adminUsr:AdminUsuariosService,
     public snackBar: MatSnackBar,
     private route: ActivatedRoute,
     private router:Router,
     private fb: UntypedFormBuilder,
     private AuthServiceService:AuthServiceService,
     private catalogo:CatalogoService)
      {


        this.route.params.subscribe(params => {
        this.Id =  params['id'];
        });

    this.AuthServiceService.user$.subscribe((user) => {
      this.Usuario = user?.id_Usuario;

    })
    this.form = this.fb.group({
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
      pIdOrganizacion:[1],
     // pIdUsuarioCreacion:[this.Usuario]
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

    this.adminUsr.getUsuarioId(this.Id).subscribe((data) => {
    //  console.log(data)
      if (data.ok) {
        this.usuarios= data.response
        console.log(this.usuarios);
        this.form.get('pPNombre')?.setValue(this.usuarios[0].pPNombre);
        this.form.get('pIdUsuario')?.setValue(this.usuarios[0].pIdUsuario);
        this.form.get('SNombre')?.setValue(this.usuarios[0].sNombre);
        this.form.get('pPApellido')?.setValue(this.usuarios[0].pPApellido);
        this.form.get('pSApellido')?.setValue(this.usuarios[0].pSApellido);
        this.form.get('pNoDPI')?.setValue(this.usuarios[0].pNoDPI);
        this.form.get('pIdRol')?.setValue(this.usuarios[0].pIdRol);
        this.form.get('pCorreo')?.setValue(this.usuarios[0].pCorreo);
        this.form.get('pNoTelefono')?.setValue(this.usuarios[0].pNoTelefono);
        this.form.get('pDireccion')?.setValue(this.usuarios[0].pDireccion);
      }
    });
  }



  onSubmit() {

    if (this.form.valid) {
      this.adminUsr.actualizarUSuario(this.form.value).subscribe(
        (response) => {

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
            this.snackBar.open('Error al Intentar Actualizar el Usuario', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    }
}


