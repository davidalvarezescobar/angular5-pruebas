import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


const routes: Routes = [
  {path:'heroes', loadChildren:'./heroes/heroes.module#HeroesModule'},
  {path:'detail/:id', loadChildren:'./hero-detail/hero-detail-routing.module#HeroDetailRoutingModule'},
  // {path:'detail/:id', loadChildren:'./hero-detail/hero-detail.module#HeroDetailModule'}, // no funciona
  {path:'dashboard', loadChildren:'./dashboard/dashboard.module#DashboardModule'}
  // {path:'**', redirectTo:'heroes'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
