import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { ToastService } from 'src/app/services/toast.service';
import { SubscriptionModalComponent } from 'src/app/modals/subscription-modal/subscription-modal.component';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.css']
})
export class SubscriptionCardComponent implements OnInit {

  @Input() subscription: Subscription;
  @Input() subscriptions: Subscription[];
  @Output() deleteAction = new EventEmitter();
  modalRef: BsModalRef;
  deleteLoading = false;
  isActivated = false;

  constructor(
    private _auth: AuthenticationService,
    private subscriptionService: SubscriptionService,
    private _modal: BsModalService,
    private _toast: ToastService

  ) { }

  ngOnInit(): void {
    if(!this.isAdmin()){
      this.subscriptionService.getSubscription().subscribe(
        data => {this.subscription = data}
      )
      if(this.subscription!==null){
        this.isActivated=true;
      }
    }
    else{
      this.subscriptionService.getAllSubscriptions().subscribe(
        data => {this.subscriptions = data}
      )
    }
  }

  isAdmin(): boolean {
    return this._auth.getRole().includes('ADMIN');
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

  }
  deactivate(){

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
