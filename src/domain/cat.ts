// this is a domain which we will use in different contexts. All business rules
// should be implemented in domain class
export class Cat {
    constructor(public name: string = '', public age: number = 0, public color: Array<string> = [] ) {
        // we want to create a business rule so that user cant set a negative cat age.
        if(this.age < 0){
            // we may have a cat validator that 
            throw new Error('Cat age cannot be negative');
        }
    }
}

