import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicComponent } from './dynamic/dynamic.component';
import { TablesComponent } from './tables/tables.component';
import { TablefieldsComponent } from './tablefields/tablefields.component';
import { DynamicfieldsComponent } from './dynamicfields/dynamicfields.component';
import { ActionComponent } from './action/action.component';
import { GridviewComponent } from './gridview/gridview.component';

const routes: Routes = [
  {path:'', redirectTo:'dynamic', pathMatch:'full'},
  {path:'dynamic', component:DynamicComponent},
  {path:'table', component:TablesComponent},
  {path:'fields',component:TablefieldsComponent},
  {path:'dynamicfields',component:DynamicfieldsComponent},
  {path:'action',component:ActionComponent},
  {path:'gridview',component:GridviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [




  ]
})
export class AppRoutingModule { }
