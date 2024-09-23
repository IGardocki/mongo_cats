import { Cat } from "./cat";
import { ValidationResponse } from "./ValidationResponse";

export function catValidator(cat: Cat) {
    // no error checking for cat name bc we encounter many cats we dont know the name of!
    if(cat.name === ''){
        return ValidationResponse.invalidResponse(['Cat age cannot be negative']);
    }

    if(cat.color.length = 0){
        return ValidationResponse.invalidResponse(['A cat must have a color!']);
    }

    return ValidationResponse.validResponse();

   

}