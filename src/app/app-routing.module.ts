import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
  // tslint:disable-next-line:comment-format
  // tslint:disable-next-line:max-line-length
  { path: '', component: MainComponent }, // canActivate: [AuthGuard] kasnije mi ne radi dohvaanje korisnika na mejnu ako dodam ovo
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canLoad: [AuthGuard] },
  // ! JA OVDE UCITAVAM CEO MODEL KOJI SE LAZY LOADUJE A NE SAMO RUTU!
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
