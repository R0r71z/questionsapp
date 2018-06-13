import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import User from '../../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {
    constructor(
        private userService: UserService,
        private cookieService: CookieService
    ) {}

    public newUser: User = new User();
    loggedUser: User = null;

    ngOnInit(): void{
        const session_id = this.cookieService.get('session_id');
        this.userService.getUser(session_id)
        .subscribe((res)=>{
            this.loggedUser = res;
        })
    }

    logout() {
        if (!this.loggedUser) return;
        this.userService.logoutUser(this.loggedUser.username)
        .subscribe(res=>{
            this.loggedUser = null;
            console.log(res);
        });
    }
}