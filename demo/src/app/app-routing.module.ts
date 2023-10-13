import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/sistema/login/login.component';
import { IndexComponent } from './components/layout/index/index.component';
import { PessoaslistComponent } from './components/pessoas/pessoaslist/pessoaslist.component';
import { CarrosListComponent } from './components/carros/carros-list/carros-list.component';
import { LivrosListComponent } from './components/livros/livros-list/livros-list.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  {
    path: "admin", component: IndexComponent, children: [
      { path: "pessoas", component: PessoaslistComponent },
      {path: "carros", component: CarrosListComponent},
      {path: "livros", component: LivrosListComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
