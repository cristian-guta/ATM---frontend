import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { ToastService } from 'src/app/services/toast.service';
import { SubscriptionModalComponent } from 'src/app/modals/subscription-modal/subscription-modal.component';
import { SubscriptionsComponent } from '../../subscriptions.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.css']
})
export class SubscriptionCardComponent implements OnInit {

  @Input() subscription: Subscription;
  @Output() deleteAction = new EventEmitter();
  modalRef: BsModalRef;
  deleteLoading = false;
  hasSubscription: boolean = false;
  
  

  constructor(
    private _auth: AuthenticationService,
    private subscriptionService: SubscriptionService,
    private _modal: BsModalService,
    private _toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptionService.getSubscription().subscribe((sub: Subscription) => {
      this.subscription = sub;
      if(sub){
        this.hasSubscription = true;
      }
    })
  }

  isAdmin(): boolean {
    return this._auth.getRole().includes('ADMIN');
  }

  isUser(){
    return this._auth.getRole().includes('USER');
  }

  openSubscriptionModal() {
    this.modalRef = this._modal.show(SubscriptionModalComponent, { initialState: { subscription: this.subscription } });
    this.modalRef.content.onClose.subscribe((subscription: Subscription) => {
        this.subscription.name = subscription.name;
        this.subscription.price = subscription.price;
        this.subscription.benefits = subscription.benefits;
    });
  }

  activate(){
    
    this.subscriptionService.activateSubscription(this.subscription).subscribe(() => {
      this._toast.showSuccess('Successfully activated subscription ' + this.subscription.name + '!');
      this.hasSubscription = true;
    },
      () => {
        this._toast.showSuccess('Failed to activate subscription ' + this.subscription.name + ', please contact support team.');
        this.hasSubscription = false;
      }
    );
    window.location.reload();
  }
  deactivate(){
    
    this.subscriptionService.cancelSubscription().subscribe(() => {
      this._toast.showSuccess('Successfully deactivated subscription ' + this.subscription.name + '!');
      this.hasSubscription = false;
    },
      () => {
        this._toast.showSuccess('Failed to deactivate subscription ' + this.subscription.name + ', please contact support team.');
        this.hasSubscription = true;
      }
    );
    window.location.reload();
  }

  delete() {
    this.deleteLoading = true;
    this.subscriptionService.deleteSubscription(this.subscription)
        .subscribe(() => {
            this._toast.showSuccess('Subscription successfully deleted.');
            this.deleteAction.emit(this.subscription);
            this.deleteLoading = false;
        },
            () => {
                this._toast.showError('Failed to delete subscription.');
                this.deleteLoading = false;
            });
  }

}
