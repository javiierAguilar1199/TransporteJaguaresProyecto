import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AdminUnidadesService } from 'src/app/services/admin-unidades.service';
import { AdminiPilotosService } from 'src/app/services/admini-pilotos.service';
import { AdminSociosServiceService } from 'src/app/services/admin-socios-service.service';

@Component({
  selector: 'app-genera-pdf-unidades',
  templateUrl: './genera-pdf-unidades.component.html',
  styleUrls: ['./genera-pdf-unidades.component.scss']
})
export class GeneraPDfUnidadesComponent {
  form: FormGroup;
  show: boolean;
  public IdPiloto: number| undefined | null = null;
  public Usuario: string | undefined | null = null;
  public socios: any[] = [];
  public Unidades: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminUni:AdminUnidadesService,
    public snackBar: MatSnackBar,
    private Router:Router,
    private AuthServiceService:AuthServiceService,
    private admi:AdminSociosServiceService) {

    this.AuthServiceService.user$.subscribe(async (user) => {
      this.Usuario = user?.id_Usuario;


    })
    this.form = this.formBuilder.group({
      pIdUnidad: ['', Validators.required],
      pIdSocio: ['', Validators.required],
      tipoMes: [null, Validators.required],
    });

    this.ngOnInit()

  }
  get f() {
    return this.form.controls;
  }

   async ngOnInit() {

    const gen = await this.admi.getSocios().toPromise();
     this.socios = gen.response
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
    const PidUnidadValue = this.form.get('pIdUnidad')?.value;
    const pMes = this.form.get('tipoMes')?.value;
    this.Router.navigate(['/pdf-unidades', PidUnidadValue, pMes])
  }
  regresar(){
    this.Router.navigate(['/lista-pilotos']);
  }
}

