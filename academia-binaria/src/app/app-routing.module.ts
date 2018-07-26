import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';


const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"profile", loadChildren:"./views/profile/profile.module#ProfileModule"},
  {path:"about", loadChildren:"./views/about/about.module#AboutModule"},
  {path:"operations", loadChildren:"./views/operations/operations.module#OperationsModule"},
  {path:"item/:id", loadChildren:"./views/detail-item/detail-item.module#DetailItemModule"},
  {path:"**", redirectTo:"home"}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
