import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  form:FormGroup;
  //Enviamos las especificaciones de validacion
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {

      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required],
          confirm: ['',Validators.required]
      });


  }
  //Comprobamos si las dos contraseñas escritas son las mismas
    isPasswordMatch() {
        const val = this.form.value;
        return val && val.password && val.password == val.confirm;
    }
    //Comprobamos si los datos estan bien, si estan bien se reedirecciona al usuario al home
    signUp() {
        const val = this.form.value;

        this.authService.signUp(val.email, val.password)
            .subscribe(
                () => {
                    alert('User created successfully !');
                    this.router.navigateByUrl('/home');
                },
                err => alert(err)
            );
    }


}
