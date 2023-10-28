import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { NgIf } from '@angular/common';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-boxed-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './boxed-login.component.html',
})
export class AppBoxedLoginComponent {
  options = {
    theme: 'light', // O define el valor inicial que desees aquí
  };
  error: string;
  constructor(private authService: AuthServiceService, private router: Router, private senttings:CoreService) {}


  form = new FormGroup({
    uname: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      // Validators.maxLength(8),
      // Validators.minLength(8),
      // Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?])(?=.*\d).+$/),
    ]),
    remember: new FormControl(false),
  });

  get f() {
    return this.form.controls;
  }


    submit() {
      //console.log(this.form)

      const username = this.form.value.uname;
      const password = this.form.value.password;
      const remember = this.form.value.remember; // Asegúrate de que esto esté configurado correctamente en tu formulario

      if (username && password) {
        this.authService.login(username, password)
        .subscribe((res) => {
          if (res.ok) {
           // console.log(res)
            this.router.navigate(['/dashboards/dashboard1']);
          } else if (res.ok === false) {
            this.error = res.msg;
          }
        },

        );
    }
}
}
