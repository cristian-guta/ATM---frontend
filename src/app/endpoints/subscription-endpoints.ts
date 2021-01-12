import { Subscription } from '../models/subscription';

export class SubscriptionEndpoints{
    allAvailableSubscriptions = 'api/subscriptions';
    currentSubscription = 'api/subscriptions/getSubscription';
    cancelSubscription = 'api/subscriptions/cancelSubscription';
    createSubscription = 'api/subscriptions/createSubscription';
    deleteSubscription = 'api/subscriptions/deleteSubscription';
    updateSubscription = 'api/subscriptions/updateSubscription';
    activateSubscription = 'api/subscriptions/activateSubscription';

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