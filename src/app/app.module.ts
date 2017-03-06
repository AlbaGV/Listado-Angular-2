import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {firebaseConfig, authConfig} from "../environments/firebase.config";
import {AngularFireModule} from "angularfire2/index";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { HomeComponent } from './home/home.component';
import {DetallesService} from "./shared/model/detalles.service";
import { ListaDetalleComponent } from './lista-detalle/lista-detalle.component';
import {RouterModule} from "@angular/router";
import {routerConfig} from "./router.config";
import { TopMenuComponent } from './top-menu/top-menu.component';
import { PerrosComponent } from './perros/perros.component';
import {PerrosService} from "./shared/model/perros.service";
import { PerroDetalleComponent } from './perro-detalle/perro-detalle.component';
import { DetalleDetalleComponent } from './detalle-detalle/detalle-detalle.component';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import { NuevoDetalleComponent } from './nuevo-detalle/nuevo-detalle.component';
import { DetalleFormComponent } from './detalle-form/detalle-form.component';
import { EditDetalleComponent } from './edit-detalle/edit-detalle.component';
import {DetalleResolver} from "./shared/model/detalle.resolver";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from "./shared/security/auth.service";
import {AuthGuard} from "./shared/security/auth.guard";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaDetalleComponent,
    TopMenuComponent,
    PerrosComponent,
    PerroDetalleComponent,
    DetalleDetalleComponent,
    SafeUrlPipe,
    NuevoDetalleComponent,
    DetalleFormComponent,
    EditDetalleComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
      AngularFireModule.initializeApp(firebaseConfig, authConfig),
      RouterModule.forRoot(routerConfig),
      ReactiveFormsModule,
      HttpModule
  ],
  providers: [DetallesService, PerrosService, DetalleResolver, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
