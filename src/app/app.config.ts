import { provideRouter, Routes } from '@angular/router';
import { IndexComponent } from './home/index/index.component';




const routes: Routes =[
 {path: 'index', component: IndexComponent},
    {path: '', redirectTo:'/index', pathMatch:'full'}

]

export const appConfig = {
  providers: [provideRouter(routes) ],
};