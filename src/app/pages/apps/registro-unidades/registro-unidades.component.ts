import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AdminUnidadesService } from 'src/app/services/admin-unidades.service';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro-unidades',
  templateUrl: './registro-unidades.component.html',
  styleUrls: ['./registro-unidades.component.scss']
})
export class RegistroUnidadesComponent {
  form: FormGroup;
  public Usuario: string | undefined | null = null;
  public Socios: any[] = [];
  public marca: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private adminUni:AdminUnidadesService,
    public snackBar: MatSnackBar,
    private AuthServiceService:AuthServiceService,
     private AdminSoci:AdminSociosServiceService,
     private catalogo:CatalogoService,
     private router:Router) {

    this.AuthServiceService.user$.subscribe(async (user) => {
      this.Usuario = user?.id_Usuario;



    })

  const pattern = /^[C]\d{3}[A-Z]{3}$/;

    this.form = this.formBuilder.group({
      pCodigoUnidad: ['', Validators.required],
      pColorUnidad: ['', Validators.required],
      pNoPlaca: ['', [Validators.required, Validators.pattern(pattern)]],
      pIdSocio: ['', Validators.required],
      pModelo: ['', Validators.required],
      pIdMarca: ['', Validators.required],
      pIdUsuario:[this.Usuario]

    });

    this.ngOnInit()


  }
  get f() {
    return this.form.controls;
  }

regresar(){
  this.router.navigate(['/lista-unidades']);
}

   async ngOnInit() {
    const gen = await this.AdminSoci.getSocios().toPromise();
    this.Socios = gen.response
    const genMarca = await this.catalogo.getMarca().toPromise();
    this.marca = genMarca.response
    console.log(this.marca)
  }

  onSubmit() {

    if (this.form.valid) {
      this.adminUni.guardarUnidad (this.form.value).subscribe(
        (response) => {
          //console.log(response)

          if (response.ok) {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 2000,
            });


            this.router.navigate(['/lista-unidades']);
          } else  {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 2000,
            });
            }

          },
          (error) => {
            console.log(error);
            this.snackBar.open('Error al Intentar Guardar La unidad', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    }
}
