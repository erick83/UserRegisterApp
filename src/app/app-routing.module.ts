import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './page/user/user.component';
import { UsersComponent } from './page/users/users.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'users/:id', component: UserComponent},
  {path: '', redirectTo: 'users', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
