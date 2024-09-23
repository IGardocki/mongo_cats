export class CatShelter {
    constructor(
        public name: string = '', 
        public yearsOpen: number = 0, 
        public sqFootage: number = 0,
        public catNumber: number = 0,
        public catDescriptions: Record<string, string>[] = [{'name': '', 'temperament': 'none listed'}],
        public employeeNames: string[] = [''],
        public tnrProgram: boolean = false,
    ) {}
}