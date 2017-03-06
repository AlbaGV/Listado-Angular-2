

import {Route} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PerrosComponent} from "./perros/perros.component";
import {PerroDetalleComponent} from "./perro-detalle/perro-detalle.component";
import {DetalleDetalleComponent} from "./detalle-detalle/detalle-detalle.component";
import {NuevoDetalleComponent} from "./nuevo-detalle/nuevo-detalle.component";
import {EditDetalleComponent} from "./edit-detalle/edit-detalle.component";
import {DetalleResolver} from "./shared/model/detalle.resolver";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./shared/security/auth.guard";

//Configuracion de seguridad y de links a traves del trabajo
export const routerConfig : Route[] = [
    {
        path:'home',
        component: HomeComponent
    },
    {
        path: 'perros',
        children: [
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: PerroDetalleComponent
                    },
                    {
                        path: 'new',
                        component: NuevoDetalleComponent
                    }
                ]
            },
            {
                path: '',
                component: PerrosComponent
            }
        ]
    },
    {
      path: 'perros/:id',
      children: [
          {
              path: 'edit',
              component: EditDetalleComponent,
              resolve: {
                lesson: DetalleResolver
              }
          },
          {
              path: '',
              component:  DetalleDetalleComponent,
              canActivate: [AuthGuard]
          }
      ]
    },
    {
        'path': 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
