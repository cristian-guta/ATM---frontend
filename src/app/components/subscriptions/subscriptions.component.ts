import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SubscriptionModalComponent } from 'src/app/modals/subscription-modal/subscription-modal.component';
import { Client } from 'src/app/models/client';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css'],
  providers: [Subscription]
})
export class SubscriptionsComponent implements OnInit {

  @Output() deleteAction = new EventEmitter();
  subscription: Subscription;
  subscriptions: Subscription[] = [];
  modalRef: BsModalRef;
  isActivated: boolean;
  client: Client;
  hasSubscription: boolean = false;
  deactivated: boolean = false;
  deleteLoading = false;

  constructor(
    private _auth: AuthenticationService,
    private subsService: SubscriptionService,
    private _modal: BsModalService,
    private _toast: ToastService,
  ) {}

  ngOnInit(){
    this.isActivated=false;
    if(!this.isAdmin()){
      this.subsService.getSubscription().subscribe((sub: Subscription) => {
        if(sub.name!=null){
          
          this.hasSubscription = true;
          this.subscription = sub;
        }
        else{
          this.hasSubscription = false;
          this.getSubscriptions();
        }
      });
    }
    else{
      this.getSubscriptions();
    }
  }

  getSubscriptions(){
    this.subsService.getAllSubscriptions().subscribe((subs: Subscription[]) => {
      this.subscriptions = subs;     
    });
  }

  openModal() {
    this.modalRef = this._modal.show(SubscriptionModalComponent);
    this.modalRef.content.onClose.subscribe((subscription: Subscription) => {
        this.subscriptions.push(subscription);
    });
  }

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  }

  isAnonymous(){
    return this._auth.getRole().includes('ANONYMOUS');
  }

  isUser(){
    return this._auth.getRole().includes('USER');
  }

  removeSubscription(subscription){
    this.subscriptions = this.subscriptions.filter((sub: Subscription) => sub.id!== subscription.id);
  }

  activate(subscription: Subscription){
        
    this.subsService.activateSubscription(subscription).subscribe(() => {
      this._toast.showSuccess('Successfully activated subscription ' + subscription.name + '!');
      this.hasSubscription = true;
      window.location.reload();
    },
      () => {
        this._toast.showError('Failed to activate subscription ' + subscription.name + ', no sufficient funds. If you do have the neccessary funds, please contact support team!');
        this.hasSubscription = false;
      }
    );
    
  }

  deactivate(){ 
    
    this.subsService.cancelSubscription().subscribe(() => {
      this._toast.showSuccess('Successfully deactivated subscription ' + this.subscription.name + '!');
      this.hasSubscription = false;
      this.deactivated = true;
    },
      () => {
        this._toast.showSuccess('Failed to deactivate subscription ' + this.subscription.name + ', please contact support team.');
        this.hasSubscription = true;
      }
    );
    window.location.reload();
  }

  delete(subscription: Subscription) {
    this.deleteLoading = true;
    this.subsService.deleteSubscription(subscription)
        .subscribe(() => {
            this.subscription.deleted=true;
            this._toast.showSuccess('Subscription successfully deleted.');
            this.deleteAction.emit(subscription);
            this.deleteLoading = false;
        },
            () => {
                this._toast.showError('Failed to delete subscription.');
                this.deleteLoading = false;
            });
    window.location.reload();
  }

  openSubscriptionModal(sub: Subscription) {
    this.modalRef = this._modal.show(SubscriptionModalComponent, { initialState: { subscription: sub } });
    this.modalRef.content.onClose.subscribe((subscription: Subscription) => {
        sub.name = subscription.name;
        sub.price = subscription.price;
        sub.benefits = subscription.benefits;
    });
  }

}
