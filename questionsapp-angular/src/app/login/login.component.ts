import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    constructor(
        private userService: UserService
    ) {}

    ngOnInit(): void{}

    submitLogin(event) {
        if (!event.keyCode) event.preventDefault();
        if (event.keyCode && event.keyCode !== 13) return;
        console.log(event.target.parentElement)
        const username = document.getElementById('userName')[0].value;
        const password = document.getElementById('userPassword')[0].value;

        this.userService.loginUser({username, password});
    }
}