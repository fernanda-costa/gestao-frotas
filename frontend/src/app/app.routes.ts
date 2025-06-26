import { Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { HomeAdminComponent } from "./modules/admin/home-admin/home-admin.component";
import { AgendarViagemComponent } from "./modules/agendamento/agendar-viagem/agendar-viagem.component";
import { LoginComponent } from "./modules/login/login.component";
import { GerenciarMotoristasComponent } from "./modules/motorista/gerenciar-motoristas/gerenciar-motoristas.component";
import { HomeMotoristaComponent } from "./modules/motorista/home-motorista/home-motorista.component";
import { ListaMotoristaComponent } from "./modules/motorista/lista-motorista/lista-motorista.component";
import { OcorrenciaListComponent } from "./modules/ocorrencia/ocorrencia-list/ocorrencia-list.component";
import { GerenciarVeiculosComponent } from "./modules/veiculo/gerenciar-veiculos/gerenciar-veiculos.component";
import { ListaVeiculosComponent } from "./modules/veiculo/lista-veiculos/lista-veiculos.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'motorista',
    component: HomeMotoristaComponent,
    canActivate: [AuthGuard],
    data: { perfis: ['MOTORISTA'] }
  },
  {
    path: 'admin',
    component: HomeAdminComponent,
    canActivate: [AuthGuard],
    data: { perfis: ['ADMINISTRADOR'] }
  },
  {
    path: 'ocorrencias',
    component: OcorrenciaListComponent,
    canActivate: [AuthGuard],
    data: { perfis: ['ADMINISTRADOR'] }
  },
  {
    path: 'motoristas',
    component: ListaMotoristaComponent,
    canActivate: [AuthGuard],
    data: { perfis: ['ADMINISTRADOR'] }
  },
  {
    path: 'motoristas/cadastrar',
    component: GerenciarMotoristasComponent,
    canActivate: [AuthGuard],
    data: { perfis: ['ADMINISTRADOR'] }
  },
  {
    path: 'motoristas/editar/:id',
    component: GerenciarMotoristasComponent,
    canActivate: [AuthGuard],
    data: { perfis: ['ADMINISTRADOR'] }
  },
  {
    path: 'veiculos',
    component: ListaVeiculosComponent,
    canActivate: [AuthGuard],
    data: { perfis: ['ADMINISTRADOR'] }
  },
  {
    path: 'veiculos/cadastrar',
    component: GerenciarVeiculosComponent,
    canActivate: [AuthGuard],
    data: { perfis: ['ADMINISTRADOR'] }
  },
  {
    path: 'veiculos/editar/:id',
    component: GerenciarVeiculosComponent,
    canActivate: [AuthGuard],
    data: { perfis: ['ADMINISTRADOR'] }
  },
  {
    path: 'viagem',
    component: AgendarViagemComponent,
    canActivate: [AuthGuard],
    data: { perfis: ['ADMINISTRADOR'] }
  },
  { path: '', redirectTo: 'motorista', pathMatch: 'full' }
];
