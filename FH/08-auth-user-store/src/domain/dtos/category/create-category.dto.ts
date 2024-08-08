export class CreateCategoryDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean
    ){};


    static create(props: {[key:string]: any}): [string? ,CreateCategoryDto? ] {
        const {name, available = false} =  props;
        
        // let availableCastBoolean = available;
      
        if(!name) return ["The field name is required", undefined];
        if(!available) return ["The field available is required"];
        if(typeof available !== "boolean") return ["The field available must be a boolean"];
      
        // if(typeof available !== "boolean"){
        //     availableCastBoolean = (available === "true")
        // }

        return [undefined,new CreateCategoryDto(name, available)];
    }
}