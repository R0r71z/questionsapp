import Answer from './answer.model';

class Question {
    _id:string;
    title:string;
    description:string;
    updated:Date;
    active:boolean;
    deleted:boolean;
    answers: Answer[];

    constructor () {
        this.title = ""
        this.description = ""
        this.updated = new Date()
        this.active = true
        this.deleted = false
        this.answers = [];
    }
}

export default Question;