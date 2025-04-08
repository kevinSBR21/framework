import { Routes } from '@angular/router';

import { IndexComponent } from './home/index/index.component';

import { MiconsultorioComponent } from './modules/Abogado/miconsultorio/miconsultorio.component';
import { SolicitudComponent } from './modules/Abogado/solicitudes/solicitudes.component';

import { NoticiasComponent } from './modules/Admin/noticias/noticias.component';
import { ProfesionalesComponent } from './modules/Admin/profesionales/profesionales.component';
import { UsuariosComponent } from './modules/Admin/usuarios/usuarios.component';
import { SolicitudesComponent } from './modules/Admin/solicitudes/solicitudes.component';

import { AsesoriasComponent } from './modules/Usuario/asesorias/asesorias.component';
import { ContactanosComponent } from './modules/Usuario/contactanos/contactanos.component';
import { ProfesionalComponent } from './modules/Usuario/profesionales/profesionales.component';


export const routes: Routes = [

    {path: 'index', component: IndexComponent},

    {path: 'mi consultorio', component: MiconsultorioComponent},
    {path: 'solicitud', component: SolicitudComponent},
    
    {path: 'solicitudes', component: SolicitudesComponent},
    {path: 'noticias', component: NoticiasComponent},
    {path: 'profesionales', component: ProfesionalesComponent},
    {path: 'usuarios', component: UsuariosComponent},

    {path: 'asesorias', component: AsesoriasComponent},
    {path: 'contactanos', component: ContactanosComponent},
    {path: 'profesional', component: ProfesionalComponent},

    {path: '', redirectTo:'/index', pathMatch:'full'}
];
