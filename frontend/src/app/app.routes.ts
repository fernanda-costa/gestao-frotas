import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { HomeMotoristaComponent } from './modules/motorista/home-motorista/home-motorista.component';
import { HomeAdminComponent } from './modules/admin/home-admin/home-admin.component';
import { GerenciarMotoristasComponent } from './modules/motorista/gerenciar-motoristas/gerenciar-motoristas.component';
import { AgendarViagemComponent } from './modules/agendamento/agendar-viagem/agendar-viagem.component';
import { ListaVeiculosComponent } from './modules/veiculo/lista-veiculos/lista-veiculos.component';
import { ListaMotoristaComponent } from './modules/motorista/lista-motorista/lista-motorista.component';

export const routes: Routes = [
    {
        path: 'motorista',
        component: HomeMotoristaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: HomeAdminComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    { path: 'motoristas', component: ListaMotoristaComponent },
    { path: 'motoristas/cadastrar', component: GerenciarMotoristasComponent },
    { path: 'motoristas/editar/:id', component: GerenciarMotoristasComponent },
    {
        path: 'veiculos',
        component: ListaVeiculosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'viagem',
        component: AgendarViagemComponent,
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'motorista', pathMatch: 'full' }
];
