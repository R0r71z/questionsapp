class Question {
    _id:string;
    title:string;
    description:string;
    updated:Date;
    active:boolean;
    deleted:boolean;

    constructor () {
        this.title = ""
        this.description = ""
        this.updated = new Date()
        this.active = true
        this.deleted = false
    }
}

export default Question;