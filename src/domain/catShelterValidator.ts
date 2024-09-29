import { CatShelter } from "./catShelter";
import { ValidationResponse } from "./ValidationResponse";

export function catShelterValidator(catShelter: CatShelter) {
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

    if(catShelter.employeeNames.length <= 0){
        return ValidationResponse.invalidResponse(['You need to have people caring for the cats!']);
    }

    // Was considering validating number of cat shelters vs cat descriptions, but many shelters do
    // not have time to write descriptions of all of their cats

    // cat shelters can have or not have tnr programs, so no need to check that. It is false by default.

    return ValidationResponse.validResponse();

   

}