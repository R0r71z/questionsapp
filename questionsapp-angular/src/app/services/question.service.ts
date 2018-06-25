import Question from '../models/question.model';
import Answer from '../models/answer.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from "rxjs/operators";
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class QuestionService {

  api_url = 'https://questions-app-api.herokuapp.com';
  questionUrl = `${this.api_url}/questions`;

  constructor(
    private http: HttpClient
  ) { }

  createQuestion(question: Question): Observable<any> {
    return this.http.post(this.questionUrl, question);
  }

  getQuestions(): Observable<Question[]> {
      return this.http.get(this.questionUrl)
      .pipe(map(res => {
          return res['data'].docs as Question[]
      }));
  }

  editQuestion(question: Question) {
      return this.http.put(this.questionUrl, question);
  }

  deleteQuestion(id: string) :any {
      return this.http.delete(`${this.questionUrl}/${id}`)
      .pipe(map(res => {
          return res;
      }));
  }

  addAnswer(questionId: string, answer: Answer): Observable<any> {
    return this.http.post(`${this.questionUrl}/answer`, answer);
  }

  removeAnswer(answerId: string): any {
      return this.http.delete(`${this.questionUrl}/answer/${answerId}`)
      .pipe(map(res=>{
          return res;
      }));
  }

  private handleError(error: any): Promise<any> {
      console.log('Error: ', error);
      return Promise.reject(error.message || error);
  }

}
