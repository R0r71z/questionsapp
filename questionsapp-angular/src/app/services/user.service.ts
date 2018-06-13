import User from '../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from "rxjs/operators";
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    api_url = 'http://localhost:3000/users';

    constructor(
        private http: HttpClient
    ) {}

    createUser(user: User): Observable<any> {
        return this.http.post(`${this.api_url}/signup`, user);
    }

    loginUser(user: Object): Observable<any> {
        return this.http.post(`${this.api_url}/login`, user);
    }

    logoutUser(username: string): Observable<any> {
        return this.http.post(`${this.api_url}/logout`, {username});
    }

    getUser(session_id: string): Observable<User> {
        return this.http.get(`${this.api_url}?session_id=${session_id}`)
        .pipe(map(res => {
            return res['data'] as User
        }));
    }

    private handleError(error: any): Promise<any> {
        console.log('Error: ', error);
        return Promise.reject(error.message || error);
    }
}