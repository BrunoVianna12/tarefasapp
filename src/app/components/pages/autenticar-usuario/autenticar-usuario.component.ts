import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { AutenticarUsuarioRequest } from '../../../models/usuarios/autenticar-usuario.request';
import { Router } from '@angular/router';
import { AuthHelper } from '../../../helpers/auth.helper';

@Component({
  selector: 'app-autenticar-usuario',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {
  mensagemErro: string = '';

  constructor(
    private authHelper: AuthHelper,
    private router: Router,
    private usuariosService: UsuariosService
  ) {

  }




  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])

  });

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    const request: AutenticarUsuarioRequest = {
      email: this.form.value.email as string,
      senha: this.form.value.senha as string
    }
    this.usuariosService.autenticar(request)
      .subscribe({
        next: (data) =>{
          this.authHelper.signIn(data);

          this.router.navigate(['admin/dashboard'])
            .then(() => {
              location.reload();
            })
        },
        error: (e) =>{
          this.mensagemErro = e.error.message;
        }
      })
  }
}
