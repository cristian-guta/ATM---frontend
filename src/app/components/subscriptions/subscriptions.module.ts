import { NgModule } from '@angular/core';
import { SubscriptionsComponent } from './subscriptions.component';
import { CommonModule } from '@angular/common';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';


import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SubscriptionModalComponent } from 'src/app/modals/subscription-modal/subscription-modal.component';
import { SubscriptionCardComponent } from './subscription-card/subscription-card/subscription-card.component';

@NgModule({
    declarations: [
        SubscriptionsComponent,
        SubscriptionCardComponent,     
    ],
    imports: [
        CommonModule,
        SubscriptionsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    entryComponents: [SubscriptionModalComponent]
})
export class SubscriptionsModule { }