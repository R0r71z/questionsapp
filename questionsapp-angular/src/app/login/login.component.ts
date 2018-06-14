import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {randomString} from 'random-string';
import { LayoutComponent } from '../_layout/app_layout/layout.component';
import 'bootstrap-notify';
import $ from 'jquery';

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
        if (event.keyCode && event.keyCode !== 13 || LayoutComponent.loggedUser) return;

        const username = document.getElementById('userName')['value'];
        const password = document.getElementById('userPassword')['value'];

        if (!(username && password)) return;

        const randomString = function(length) {
            let text = "";
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for(let i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }

        const startLoading = function() {
            document.body.classList.add('loading');
            document.querySelector('.fa-spin').classList.remove('d-none');
            document.getElementById('submit').classList.add('disabled');
        }

        const cancelLoading = function () {
            document.body.classList.remove('loading');
            document.querySelector('.fa-spin').classList.add('d-none');
            document.getElementById('submit').classList.remove('disabled');
        }

        const session_id = randomString(20);
        
        startLoading();
        return this.userService.loginUser({
            username,
            password,
            session_id
        }).subscribe(res => {
            window.location.href = '';
        }, err=>{
            cancelLoading();
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                title: '<strong>Something went wrong<br></strong>',
                message: 'Invalid username or password',
            },{
                element: 'body',
                type: "danger",
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 5000,
                timer: 1000,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                }
            });
        });
    }

}