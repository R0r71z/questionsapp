import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Response } from '@angular/http';
import Question from '../models/question.model';
import {LayoutComponent} from '../_layout/app_layout/layout.component';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{
  constructor(
    private questionService: QuestionService,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  public newQuestion: Question = new Question();

  questionList: Question[];
  editQuestions: Question[] = [];

  ngOnInit(): void {
    this.questionService.getQuestions()
    .subscribe(questions => {
      this.questionList = questions;
    });

    const session_id = this.cookieService.get('session_id');
    if (!session_id) return;
    this.userService.getUser(session_id)
    .subscribe((res)=>{
        if (!res) return window.location.href='login';
    });
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

  togglePanel(event) {
    const _this = event.target;
    const panel = _this.nextElementSibling;

    _this.classList.toggle('active');
    panel.style.maxHeight = panel.style.maxHeight ? null : `${panel.scrollHeight}px`; 

  }

  deleteAnswer(question, answer) {
    this.questionService.removeAnswer(answer._id).subscribe(res=>{
      question.answers.splice(question.answers.indexOf(answer),1);
    })
  }
}
