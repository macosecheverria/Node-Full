export class TodoEntity {
    constructor(
        private readonly id: number,
        private readonly text:string,
        private readonly completedAt: Date
    ){}

    get isCompleted(){
        return !!this.completedAt
    }

    public static fromObject(object: {[key: string]: any}): TodoEntity{
        const { id, text, completedAt} = object;

        if(!id) throw "ID is required";
        if(!text) throw "Text is required";

        let newCompletedAt;

        if(completedAt){
            newCompletedAt = new Date(completedAt);
            
            if(isNaN(newCompletedAt.getTime())){
                throw "CompletedAt is not a valid Date";
            }
        }

        return new TodoEntity(id,text, completedAt);
    }

}