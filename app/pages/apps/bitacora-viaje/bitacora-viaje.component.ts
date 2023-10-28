import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';
import { AdminUnidadesService } from 'src/app/services/admin-unidades.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AdminViajesService } from 'src/app/services/admin-viajes.service';
import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { id } from 'date-fns/locale';
@Component({
  selector: 'app-bitacora-viaje',
  templateUrl: './bitacora-viaje.component.html',
  styleUrls: ['./bitacora-viaje.component.scss']
})
export class BitacoraViajeComponent implements OnInit{
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


  constructor(
    private formBuilder: FormBuilder,
    private adminUni:AdminUnidadesService,
    public snackBar: MatSnackBar,
    private AuthServiceService:AuthServiceService,
    private AdminSoci:AdminSociosServiceService,
    private adminViajes:AdminViajesService,
    private adminPilo:AdminiPilotosService,
    private catalogo:CatalogoService,
    private router:Router
    ) {


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
      pIdUsuario:[this.Usuario]

    });

    this.ngOnInit()

  }
  get f() {
    return this.form.controls;
  }

regresar(){
  this.router.navigate(['/lista-viajes']);
}

   async ngOnInit() {

    const gen = await this.AdminSoci.getSocios().toPromise();
    this.Socios = gen.response

    const genPiloto = await this.adminPilo.getPilotos().toPromise();
    this.Pilotos = genPiloto.response


    const geDepto = await this.catalogo.getDepartamento().toPromise();
    this.departamento = geDepto.response



  }

  onOptionSelected(id: number) {
    this.catalogo.getMunicipio(id).subscribe((municipio) => {
      this.municipios = municipio.response;
      this.show = true;

    });
  }

  onOption(id: number) {
   // console.log(id)
    this.adminUni.getUnidades(id).subscribe((unidades) => {
      this.Unidades = unidades.response;
      console.log(this.Unidades)
      this.show = true;

    });
  }
  onSubmit() {

    if (this.form.valid) {
      this.adminViajes.guardarViaje(this.form.value).subscribe(
        (response) => {

          if (response.ok) {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 2000,
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
            this.snackBar.open('Error al Intentar Guardar la bitacora de Viaje', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    }
}
