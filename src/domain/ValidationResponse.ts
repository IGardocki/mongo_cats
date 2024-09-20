export class ValidationResponse{
    constructor(public readonly valid: boolean, public readonly errors: string[]){};

    public errorsAsString(){
        return this.errors.join(', ');
    }

    public static validResponse(){
        return new ValidationResponse(true, []);
    }

    public static invalidResponse(errors: string[]){
        return new ValidationResponse(false, errors);
    }
}