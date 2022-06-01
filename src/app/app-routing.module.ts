import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ListManagerComponent } from './Components/list-manager/list-manager.component';
import { SettingsComponent } from './Components/settings/settings.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'manager', component:ListManagerComponent},
  {path:'settings', component:SettingsComponent},
  {path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
