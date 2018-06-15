import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "../../services/user.service";
import User from '../../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from "../../login/login.component";

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
    static loggedUser: User = null;

    ngOnInit(): void{
        const session_id = this.cookieService.get('session_id');
        if (!session_id) return;
        this.userService.getUser(session_id)
        .subscribe((res)=>{
            LayoutComponent.loggedUser = res;
        })
    }

    logout() {
        if (!LayoutComponent.loggedUser) return;
        this.userService.logoutUser(LayoutComponent.loggedUser.username)
        .subscribe(res=>{
            LayoutComponent.loggedUser = null;
        });
    }

    get userIsLogged() {
        return !!(LayoutComponent.loggedUser);
    }
}