import { Router } from "@angular/router";
import { AuthHelper } from "../helpers/auth.helper";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard {

    constructor(
            private router: Router,
            private authHelper: AuthHelper
    ) {}

    canActivate(){
        const usuario = this.authHelper.getUser();
        if (usuario != null){
            return true;
        }
        else{
            this.router.navigate(['/pages/autenticar-usuario']);
            return false;
        }
    }
}