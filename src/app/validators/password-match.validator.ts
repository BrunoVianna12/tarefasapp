import { AbstractControl } from "@angular/forms";

export class PasswordMatchValidator {
    static matchPassword(abstractControl: AbstractControl){
        let senha = abstractControl.get('senha')?.value;
        let senhaConfirmacao = abstractControl.get('senhaConfirmacao')?.value;

        if(senhaConfirmacao.length > 0 && senha != senhaConfirmacao){
            abstractControl.get('senhaConfirmacao')?.setErrors({
                matchPassword: true
            });
        }
        return null;
    }
}