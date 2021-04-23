import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/model';
import { USERSTATUS } from '../../constants/constants';

@Component( {
                selector: 'app-register',
                templateUrl: './register.page.html',
                styleUrls: [ './register.page.scss' ],
            } )
export class RegisterPage implements OnInit {

    email = '';
    name = '';
    password = '';

    constructor( private authService: AuthService ) { }

    ngOnInit() {
    }

    register() {
        const user: UserModel = {
            id: '',
            email: this.email,
            name: this.name,
            password: this.password,
            ghostMode: '',
            profilePic: '',
            status: USERSTATUS.online,
        };

        this.authService.signUp( user );
    }
}
