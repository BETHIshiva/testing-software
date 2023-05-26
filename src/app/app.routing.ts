import { TablesComponent } from "./tables/tables.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

// const routes: Routes = []; // sets up routes constant where you define your routes
const routes: Routes = [
  { path: 'table', component: TablesComponent },

];
// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
