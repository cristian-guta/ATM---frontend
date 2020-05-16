export class OperationsEndpoints{
    allOperations='operations';

    getAllOperations(page, size){
        return this.allOperations + '/' + page + '/' + size;
    }
}