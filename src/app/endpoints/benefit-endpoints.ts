export class BenefitEndpoints{
    allBenefits = 'benefits';
    unpagedBenefits = 'benefits/unpagedBenefits';
    // bySubscription = 'benefits/bySubscription';

    // getBenefitsBySubscription(id : number): string{
    //     return this.bySubscription + '/' + id;
    // }

    getAllBenefits(page: number, size: number){
        return this.allBenefits + '/' + page + '/' + size;
    }

}