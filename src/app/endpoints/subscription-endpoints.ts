import { Subscription } from '../models/subscription';

export class SubscriptionEndpoints{
    allAvailableSubscriptions = 'subscriptions';
    currentSubscription = 'subscriptions/getSubscription';
    cancelSubscription = 'subscriptions/cancelSubscription';
    createSubscription = 'subscriptions/createSubscription';
    deleteSubscription = 'subscriptions/deleteSubscription';
    updateSubscription = 'subscriptions/updateSubscription';
    activateSubscription = 'subscriptions/activateSubscription';

    getDelete(subscription: Subscription): string{
        return this.deleteSubscription + '/' + subscription.id;
    }

    getUpdate(subscription: Subscription): string{
        return this.updateSubscription + '/' + subscription.id;
    }

    activateSub(subscription: Subscription): string{
        return this.activateSubscription + '/' + subscription.id;
    }
}