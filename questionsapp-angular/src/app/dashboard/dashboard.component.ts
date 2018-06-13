import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Response } from '@angular/http';
import Question from '../models/question.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{
  constructor(
    private questionService: QuestionService
  ) {}

  public newQuestion: Question = new Question();

  questionList: Question[];
  editQuestions: Question[] = [];

  ngOnInit(): void {
    this.questionService.getQuestions()
    .subscribe(questions => {
      this.questionList = questions;
      console.log(questions);
    })
  }

  create() {
    this.questionService.createQuestion(this.newQuestion)
    .subscribe((res)=>{
      this.questionList.push(res.data)
      this.newQuestion = new Question()
    })
  }

  editQuestion(question: Question) {
    if (this.questionList.includes(question)) {
      if (!this.editQuestions.includes(question)) {
        this.editQuestions.push(question)
      } else {
        this.editQuestions.splice(this.editQuestions.indexOf(question), 1)
        this.questionService.editQuestion(question).subscribe(res => {
          console.log('Update succesful')
        }, err => {
          this.editQuestion(question)
          console.log('Update unsuccesful')
        })
      }
    }
  }

  doneQuestion(question: Question) {
    this.questionService.editQuestion(question)
    .subscribe((res)=>{
      this.editQuestions.splice(this.editQuestions.indexOf(question), 1)
      console.log('Update succesful')
    }, err => {
      this.editQuestion(question)
      console.log('Update unsuccesful')
    })
  }

  submitQuestion(event, question: Question) {
    if (event.keyCode == 13) this.editQuestion(question)
  }

  deleteQuestion(question: Question) {
    this.questionService.deleteQuestion(question._id).subscribe(res=>{
      this.questionList.splice(this.questionList.indexOf(question),1);
    })
  }
}
