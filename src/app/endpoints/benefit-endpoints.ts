export class BenefitEndpoints{
    allBenefits = 'benefits';
    bySubscription = 'benefits/subscription';

    getBenefitsBySubscription(id : number): string{
        return this.bySubscription + '/' + id;
    }
}