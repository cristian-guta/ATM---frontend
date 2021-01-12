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
    },
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'operations',
    loadChildren: () => import('./components/operations/operations.module').then(m => m.OperationsModule),
    canActivate: [AuthGuard],
    data: {
        roles: ['ANONYMOUS', 'USER', 'ADMIN']
    },
    runGuardsAndResolvers: 'always'
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
  {
    path: 'updateUserData',
    loadChildren: () => import('./components/update-user-data/updateUserData.module').then(m => m.UpdateUserDataModule  ),
    canActivate: [AuthGuard],
    data: {
        roles: ['ANONYMOUS', 'USER']
    }
  },
  {
    path: 'benefitsAudit',
    loadChildren: () => import('./components/benefit-audit/benefit-audit-routing.module').then(m => m.BenefitAuditRoutingModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'subscriptionsAudit',
    loadChildren: () => import('./components/subscription-audit/subscription-audit-routing.module').then(m => m.SubscriptionAuditRoutingModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
