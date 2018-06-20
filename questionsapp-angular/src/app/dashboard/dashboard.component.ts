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

  questionList: Question[] = [];
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
      LayoutComponent.generateNotification('success', 'Success!', 'Your question was created succesfully');
    }, error => {
      console.log(error);
      LayoutComponent.generateNotification('danger', 'Something went wrong', 'Your question was not created');
    });
  }

  editQuestion(question: Question) {
    if (this.questionList.includes(question)) {
      if (this.editQuestions.includes(question)) return;
      this.editQuestions.push(question);
    }
  }

  doneQuestion(question: Question) {
    if (!this.editQuestions.includes(question)) return;
    this.questionService.editQuestion(question)
    .subscribe((res)=>{
      this.editQuestions.splice(this.editQuestions.indexOf(question), 1)
      LayoutComponent.generateNotification('success', 'Success!', 'Your question was edited succesfully');
    }, err => {
      this.editQuestion(question)
      LayoutComponent.generateNotification('danger', 'Something went wrong', 'Your question was not edited');
    })
  }

  submitQuestion(event, question: Question) {
    if (event.keyCode == 13) this.doneQuestion(question)
  }

  deleteQuestion(question: Question) {
    if (confirm(`This question ${question.answers.length ? 'and all its answers' : ''} will be removed.`)) {
      this.questionService.deleteQuestion(question._id).subscribe(res=>{
        this.questionList.splice(this.questionList.indexOf(question),1);
      })
    }
  }

  togglePanel(event) {
    const _this = event.target;
    const panel = _this.nextElementSibling;

    _this.classList.toggle('active');
    panel.style.maxHeight = panel.style.maxHeight ? null : `${panel.scrollHeight}px`; 

  }

  deleteAnswer(question, answer) {
    if (confirm('This answer will be removed from this question.')) {
      this.questionService.removeAnswer(answer._id).subscribe(res=>{
        question.answers.splice(question.answers.indexOf(answer),1);
      })
    }
  }
}
