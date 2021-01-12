export class BenefitEndpoints{
    allBenefits = 'api/benefits';
    unpagedBenefits = 'api/benefits/unpagedBenefits';
    bySubscriptionPaged = 'api/benefits/user';

    // getBenefitsBySubscription(id : number): string{
    //     return this.bySubscription + '/' + id;
    // }

    getAllBenefits(page: number, size: number){
        return this.allBenefits + '/' + page + '/' + size;
    }

    
    getAllBenefitsBySubscription(page: number, size: number){
        return this.bySubscriptionPaged + '/' + page + '/' + size;
    }

}