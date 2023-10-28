import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AdminUnidadesService } from 'src/app/services/admin-unidades.service';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ActivatedRoute, Router } from '@angular/router';


import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-actualizar-unidad',
  templateUrl: './actualizar-unidad.component.html',
  styleUrls: ['./actualizar-unidad.component.scss']
})
export class ActualizarUnidadComponent  implements OnInit{
  form: FormGroup;
  id: number = 0;
  public Usuario: string | undefined | null = null;
  public Socios: any[] = [];
  public marca: any[] = [];

  unidades: any= [];

  constructor(private route: ActivatedRoute,
    private adminUni:AdminUnidadesService,
    public snackBar: MatSnackBar,
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
    private adminSocios: AdminSociosServiceService,
    private AuthServiceService:AuthServiceService,
    private catalogo:CatalogoService,
    private router:Router,

    ) {

      this.route.params.subscribe(params => {
        this.id = +params['id'];
      });


    this.AuthServiceService.user$.subscribe(async (user) => {
      this.Usuario = user?.id_Usuario;
     // console.log(this.Usuario)
    })

  const pattern = /^[C]\d{3}[A-Z]{3}$/;

  this.form = this.fb.group({
      pCodigoUnidad: ['', Validators.required],
      pColorUnidad: ['', Validators.required],
      pNoPlaca: ['', [Validators.required, Validators.pattern(pattern)]],
      pIdSocio: ['', Validators.required],
      pModelo: ['', Validators.required],
      pIdMarca: ['', Validators.required],
      pIdUsuario:[this.Usuario],
      pIdUnidad: [this.id]
    });

  }
  get f() {
    return this.form.controls;
  }


  async ngOnInit(): Promise<void> {
//Listas de Marca y Socios
    const gen = await this.adminSocios.getSocios().toPromise();
  this.Socios = gen.response
  const genUni = await this.catalogo.getMarca().toPromise();
  this.marca = genUni.response
 // console.log(this.marca)

    this.adminUni.getUnidadXID(this.id).subscribe((data) => {
    //  console.log(data)
      if (data.ok) {
        this.unidades= data.response
        this.form.get('pCodigoUnidad')?.setValue(this.unidades[0].pCodigoUnidad);
        this.form.get('pColorUnidad')?.setValue(this.unidades[0].pColor);
        this.form.get('pModelo')?.setValue(this.unidades[0].pModelo);
        this.form.get('pNoPlaca')?.setValue(this.unidades[0].pNoPlaca);
        this.form.get('pIdSocio')?.setValue(this.unidades[0].pIdSocio);
        this.form.get('pIdMarca')?.setValue(this.unidades[0].pIdMarca);
      }
    });

  }

regresar(){
  this.router.navigate(['/lista-unidades']);
}

  onSubmit() {
    if (this.form.valid) {
      this.adminUni.actualizarUnidad(this.form.value).subscribe(
        (response) => {

          if (response.ok) {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 3000,
            });
            this.router.navigate(['/lista-unidades']);

          } else  {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 3000,
            });
            }

          },
          (error) => {
            console.log(error);
            this.snackBar.open('Error al Intentar Actualizar la unidad', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    }
}

