import { CatShelter } from "./catShelter";
import { ValidationResponse } from "./ValidationResponse";

export function catValidator(catShelter: CatShelter) {
    if(catShelter.name === ''){
        return ValidationResponse.invalidResponse(['A shelter must have a name!']);
    }

    if(catShelter.yearsOpen < 0){
        return ValidationResponse.invalidResponse(['A cat shelter cannot be open for negative years']);
    }

    if(catShelter.sqFootage <= 0){
        return ValidationResponse.invalidResponse(['You must have space for cats.']);
    }

    if(catShelter.catNumber < 0){
        return ValidationResponse.invalidResponse(['You cannot have negative cats.']);
    }

    // since cat descriptions is a Record<string, string>, should not be possible to enter something of
    // negative length

    if(catShelter.employeeNames.length <= 0){
        return ValidationResponse.invalidResponse(['You need to have people caring for the cats!']);
    }

    // cat shelters can have or not have tnr programs, so no need to check that. It is false by default.

    return ValidationResponse.validResponse();

   

}