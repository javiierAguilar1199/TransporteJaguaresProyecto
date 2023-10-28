import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminHorariosService } from 'src/app/services/admin-horarios.service';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';
import { AdminUnidadesService } from 'src/app/services/admin-unidades.service';
import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatNativeDateModule } from '@angular/material/core';
import { CatalogoService } from 'src/app/services/catalogo.service';




@Component({
  selector: 'app-registro-horarios',
  templateUrl: './registro-horarios.component.html',
  styleUrls: ['./registro-horarios.component.scss']
})
export class RegistroHorariosComponent {
  form: FormGroup;
  municipios: any = [];
  public Usuario: string | undefined | null = null;
  public Socios: any[] = [];
  public Unidades: any[] = [];
  public Pilotos: any[] = [];
  show: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private adminUni:AdminUnidadesService,
    public snackBar: MatSnackBar,
    private catalog:CatalogoService,
    private AuthServiceService:AuthServiceService,
    private AdminSoci:AdminSociosServiceService,
    private adminPilo:AdminiPilotosService,
    private adminHorario:AdminHorariosService,
    private router:Router
    ){
    this.AuthServiceService.user$.subscribe(async (user) => {
      this.Usuario = user?.id_Usuario;
     // console.log(this.Usuario)


    })
    this.form = this.formBuilder.group({
      pHoraEntrega: ['', Validators.required],
      pFechaCarga: ['', Validators.required],
      pPlanta: ['', Validators.required],
      pIdSocio: ['', Validators.required],
      pIdPiloto: ['', Validators.required],
      pIdUnidad: ['', Validators.required],
      pIdUsuario:[this.Usuario]

    });

    this.ngOnInit()

  }
  get f() {
    return this.form.controls;
  }


   async ngOnInit() {
    const pIdSocio = this.form.get('pIdSocio')?.value;
    const gen = await this.AdminSoci.getSocios().toPromise();
    this.Socios = gen.response
    // const genUni = await this.adminUni.getUnidades(pIdSocio).toPromise();
    // this.Unidades = genUni.response
    const genPilo = await this.adminPilo.getPilotos().toPromise();
    this.Pilotos = genPilo.response

  }

  regresar() {
    this.router.navigate(['/lista-horarios']);
  }


  onOptionSelected(id: number) {
    // if (id !== 0) {
      this.adminUni.getUnidades(id).subscribe((unidades) => {
        this.Unidades = unidades.response;
        console.log(this.Unidades);
        this.show = true;
      });
    // } else {
    //   console.log('El ID está en blanco. No se realizará la suscripción al observable.');
    // }
  }


  onSubmit() {

    if (this.form.valid) {
      this.adminHorario.guardarHorario (this.form.value).subscribe(
        (response) => {


          if (response.ok) {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 2000,
            });

            this.router.navigate(['/lista-horarios']);

          } else  {
            this.snackBar.open(response.pTransaccionMensaje, 'Cerrar',{
              duration: 2000,
            });
            }

          },
          (error) => {
            console.log(error);
            this.snackBar.open('Error al Intentar Guardar El Horario', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    }
}
