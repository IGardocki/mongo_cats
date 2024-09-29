type catDescription = {
    name: string,
    description: string
}

export class CatShelter {
    constructor(
        public name: string = '', 
        public yearsOpen: number = 0, 
        public sqFootage: number = 0,
        public catNumber: number = 0,
        public catDescriptions: catDescription[] = [{name: '', description: 'none listed'}],
        public employeeNames: string[] = [''],
        public tnrProgram: boolean = false,
    ) {}
}