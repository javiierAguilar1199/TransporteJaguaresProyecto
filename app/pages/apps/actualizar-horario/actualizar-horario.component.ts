import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminHorariosService } from 'src/app/services/admin-horarios.service';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';
import { AdminUnidadesService } from 'src/app/services/admin-unidades.service';
import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';



@Component({
  selector: 'app-actualizar-horario',
  templateUrl: './actualizar-horario.component.html',
  styleUrls: ['./actualizar-horario.component.scss']
})
export class ActualizarHorarioComponent{
  form: FormGroup;
  id: number = 0;
  horarios: any= [];
  public Usuario: string | undefined | null = null;
  public Socios: any[] = [];
  public Unidades: any[] = [];
  public Pilotos: any[] = [];
  show: boolean;
  constructor(private formBuilder: FormBuilder,
    private adminUni:AdminUnidadesService,
    public snackBar: MatSnackBar,
    private AuthServiceService:AuthServiceService,
    private AdminSoci:AdminSociosServiceService,
    private adminPilo:AdminiPilotosService,
     private adminHorario:AdminHorariosService,
    private route: ActivatedRoute,
    private router:Router,) {

  this.route.params.subscribe(params => {
        this.id = +params['id'];
      });

      this.AuthServiceService.user$.subscribe(async (user) => {
      this.Usuario = user?.id_Usuario;



    })
    this.form = this.formBuilder.group({
      pHoraEntrega: ['', Validators.required],
      pFechaCarga: ['', Validators.required],
      pPlanta: ['', Validators.required],
      pIdSocio: ['', Validators.required],
      pIdPiloto: ['', Validators.required],
      pIdUnidad: ['', Validators.required],
      pIdUsuario:[this.Usuario],
      pIdHorario: [this.id],

    });

  }
  get f() {
    return this.form.controls;
  }

  regresar(){
    this.router.navigate(['/lista-horarios']);
  }

   async ngOnInit() {

    const gen = await this.AdminSoci.getSocios().toPromise();
    this.Socios = gen.response

    const genPilo = await this.adminPilo.getPilotos().toPromise();
    this.Pilotos = genPilo.response

    this.adminHorario.getHorarioId(this.id).subscribe((data) => {
       // console.log(data)
        if (data.ok) {
          this.horarios= data.response
          console.log(this.horarios)
          this.form.get('pHoraEntrega')?.setValue(this.horarios[0].pHoraCarga);
          this.form.get('pFechaCarga')?.setValue(this.horarios[0].pFechaCarga);
          this.form.get('pPlanta')?.setValue(this.horarios[0].pPlantaCarga);
          this.form.get('pNoPlaca')?.setValue(this.horarios[0].pNoPlaca);
          this.form.get('pIdSocio')?.setValue(this.horarios[0].pIdSocio);
          this.onOptionSelected(this.horarios[0].pIdSocio);
          this.form.get('pIdPiloto')?.setValue(this.horarios[0].pIdPiloto);
          this.form.get('pIdUnidad')?.setValue(this.horarios[0].pIdUnidad);
        }
      });
  }

  onOptionSelected(id: number) {
    console.log(id)
    this.adminUni.getUnidades(id).subscribe((unidades) => {
      this.Unidades = unidades.response;
      console.log(this.Unidades)
      this.show = true;

    });
  }

  onSubmit() {

    if (this.form.valid) {
      this.adminHorario.actualizarHorario (this.form.value).subscribe(
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
            this.snackBar.open('Error al Intentar actualizar Horario', 'Cerrar', {
              duration: 2000,
            });
          }
        );
      }
    }
}
