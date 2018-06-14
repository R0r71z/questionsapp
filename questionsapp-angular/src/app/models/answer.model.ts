class Answer {
    _id: string;
    content: string;
    published: boolean;
    deleted: boolean;
    questionId: string;
    updated: Date;

    constructor() {
        this._id = "";
        this.content = "";
        this.published = true;
        this.deleted = false;
        this.questionId = "";
        this.updated = new Date();
    }
}

export default Answer;