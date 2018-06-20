import { Component, OnInit } from "@angular/core";
import Question from '../models/question.model';
import Answer from '../models/answer.model';
import { QuestionService } from '../services/question.service';
import { LayoutComponent } from "../_layout/app_layout/layout.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    constructor(
        private questionService: QuestionService
    ){}

    questionList: Question[] = [];

    ngOnInit(): void {
        this.questionService.getQuestions()
        .subscribe(questions => {
            this.questionList = questions;
        });
    }

    togglePanel(event) {
        const _this = event.target;
        const panel = _this.nextElementSibling;

        _this.classList.toggle('active');
        panel.style.maxHeight = panel.style.maxHeight ? null : `${panel.scrollHeight}px`; 

    }

    sendAnswer(event, question) {
        let newAnswer = new Answer();
        const answerContent = event.target.parentElement.querySelector('textarea').value;
        newAnswer.content = answerContent.replace(/(<([^>]+)>)/ig,"");
        newAnswer.questionId = question._id;

        event.target.parentElement.querySelector('textarea').value = "";

        return this.questionService.addAnswer(question._id, newAnswer)
        .subscribe(res=>{
            this.questionList[this.questionList.indexOf(question)].answers.push(res.data);
            LayoutComponent.generateNotification('success', 'Success', 'Your answer was sent correctly.');
        }, err => {
            console.log(err);
            LayoutComponent.generateNotification('danger', 'Something went wrong', 'Your answer was not sent correctly');
        });
    }

    checkValidContent(event) {
        const _this = event.target;
        const button = _this.parentElement.querySelector('button');

        if (!!_this.value)
            button.classList.remove('d-none')
        else 
            button.classList.add('d-none')
    }
}