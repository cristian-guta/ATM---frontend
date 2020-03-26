import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'subscriptions',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
        roles: ['ANONYMOUS', 'USER', 'ADMIN']
    }
  },
  {
    path: '',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [AuthGuard],
    data: {
        roles: ['ANONYMOUS']
    }
  },
  {
      path: 'home',
      loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
      canActivate: [AuthGuard],
      data: {
          roles: ['ANONYMOUS', 'USER', 'ADMIN']
      }
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./components/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule),
    canActivate: [AuthGuard],
    data: {
        roles: ['ANONYMOUS', 'USER', 'ADMIN']
    }
  },
  {
    path: 'benefits',
    loadChildren: () => import('./components/benefits/benefits.module').then(m => m.BenefitsModule),
    canActivate: [AuthGuard],
    data: {
        roles: ['ANONYMOUS', 'USER', 'ADMIN']
    }
  },
  {
    path: 'accounts',
    loadChildren: () => import('./components/accounts/accounts.module').then(m => m.AccountsModule),
    canActivate: [AuthGuard],
    data: {
        roles: ['USER', 'ADMIN']
    }
  },
  {
    path: 'clients',
    loadChildren: () => import('./components/clients/clients.module').then(m => m.ClientsModule),
    canActivate: [AuthGuard],
    data: {
        roles: ['ADMIN']
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
