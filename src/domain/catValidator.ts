import { Cat } from "./cat";
import { ValidationResponse } from "./ValidationResponse";

// you can continue to add validation to this
// TODO- build this out and add more validation
export function catValidator(cat: Cat) {
    if(cat.age < 0){
        return ValidationResponse.invalidResponse(['Cat age cannot be negative']);
    }
    return ValidationResponse.validResponse();

}