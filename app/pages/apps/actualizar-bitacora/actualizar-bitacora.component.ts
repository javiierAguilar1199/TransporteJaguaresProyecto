import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';
import { AdminUnidadesService } from 'src/app/services/admin-unidades.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AdminViajesService } from 'src/app/services/admin-viajes.service';
import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { id } from 'date-fns/locale';
import { Route, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-actualizar-bitacora',
  templateUrl: './actualizar-bitacora.component.html',
  styleUrls: ['./actualizar-bitacora.component.scss']
})
export class ActualizarBitacoraComponent implements OnInit{
  form: FormGroup;
  public Usuario: string | undefined | null = null;
  public idDepar: null | undefined | null = null;
  public Socios: any[] = [];
  public Unidades: any[] = [];
  public Pilotos: any[] = [];
  public municipio: any[] = [];

  public departamento: any[] = [];
  municipios: any = [];
  show: boolean;
  id: number = 0;
  Viajes: any= [];


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminUni:AdminUnidadesService,
    public snackBar: MatSnackBar,
    private AuthServiceService:AuthServiceService,
     private AdminSoci:AdminSociosServiceService,
      private adminViajes:AdminViajesService,
    private adminPilo:AdminiPilotosService,
    private catalogo:CatalogoService,
    private router:Router) {

      this.route.params.subscribe(params => {
        this.id = +params['id'];
      });

      //Recupera el Usuario de la Sesion
    this.AuthServiceService.user$.subscribe(async (user) => {
      this.Usuario = user?.id_Usuario;

    })
    const patternNumbersOnly = /^[0-9]+$/;


    this.form = this.formBuilder.group({
      pIdNumeroEntrega: ['', [Validators.required, Validators.pattern(patternNumbersOnly)]],
      pFechaEntrega: ['', Validators.required],
      pHoraEntrega: ['', Validators.required],
      pIdSocio: ['', Validators.required],
      pDiaEntrega: ['', Validators.required],
      pLugarEntrega: ['', Validators.required],
      pProductoEntrega: ['', Validators.required],
      pIdPiloto: ['', Validators.required],
      pIdUnidad: ['', Validators.required],
      pObservaciones: ['', Validators.required],
      pIdDepartamento: ['', Validators.required],
      pIdMunicipio: ['', Validators.required],
      pIdUsuario:[this.Usuario],
      pIdBitacora:[this.id]

    });

    this.ngOnInit()

  }
  get f() {
    return this.form.controls;
  }

   async ngOnInit() {

    const gen = await this.AdminSoci.getSocios().toPromise();
    this.Socios = gen.response


    const genPiloto = await this.adminPilo.getPilotos().toPromise();
    this.Pilotos = genPiloto.response


    const geDepto = await this.catalogo.getDepartamento().toPromise();
    this.departamento = geDepto.response

    this.adminViajes.getBitacoraID(this.id).subscribe((data) => {
//console.log(data)
      if (data.ok) {
        this.Viajes= data.response
        this.form.get('pIdDepartamento')?.setValue(this.Viajes[0].pDepartamento)
        this.onOptionSelected(this.Viajes[0].pDepartamento);
        this.form.get('pFechaEntrega')?.setValue(this.Viajes[0].pFechaEntrega);
        this.form.get('pIdNumeroEntrega')?.setValue(this.Viajes[0].pNoEntrega);
        this.form.get('pHoraEntrega')?.setValue(this.Viajes[0].pHOraEntrega);
        this.form.get('pIdSocio')?.setValue(this.Viajes[0].pIdSocio);
        this.onOption(this.Viajes[0].pIdSocio);
        this.form.get('pDiaEntrega')?.setValue(this.Viajes[0].pDiaEntrega);
        this.form.get('pIdMunicipio')?.setValue(this.Viajes[0].pMunicipio);
        this.form.get('pLugarEntrega')?.setValue(this.Viajes[0].pLugarEntrega);
        this.form.get('pObservaciones')?.setValue(this.Viajes[0].pObservaciones);
        this.form.get('pProductoEntrega')?.setValue(this.Viajes[0].pProducto);
        this.form.get('pIdPiloto')?.setValue(this.Viajes[0].pIdPiloto);
        this.form.get('pIdUnidad')?.setValue(this.Viajes[0].pIdUnidad);
      }
    });


  }

  onOptionSelected(idDepar: number) {
    this.catalogo.getMunicipio(idDepar).subscribe((municipio) => {
      this.municipios = municipio.response;
    //  console.log(this.municipios)
      this.show = true;

    });
  }
  onOption(id: number) {
    console.log(id)
    this.adminUni.getUnidades(id).subscribe((unidades) => {
      this.Unidades = unidades.response;
      console.log(this.Unidades)
      this.show = true;
    });
  }
regresar(){
  this.router.navigate(['/lista-viajes']);
}

  onSubmit() {

    if (this.form.valid) {
      this.adminViajes.ActualizarViaje(this.form.value).subscribe(
        (response) => {
     // console.log(response)

          if (response.ok) {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 3000,
            });
            this.router.navigate(['/lista-viajes']);

          } else  {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 2000,
            });
            }

          },
          (error) => {
            console.log(error);
            this.snackBar.open('Error al Intentar Actualizar la Bitácora', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    }
}

