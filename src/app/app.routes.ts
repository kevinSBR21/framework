import { Routes } from '@angular/router';

import { IndexComponent } from './home/index/index.component';

export const routes: Routes = [

    {path: 'index', component: IndexComponent},


    {path: '', redirectTo:'/index', pathMatch:'full'}
];
