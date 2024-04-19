import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { fromEvent } from 'rxjs';
import { UsuariosService } from '../../../services/usuarios.service';
import { CriarUsuarioRequest } from '../../../models/usuarios/criar-usuario.request';
import { PasswordMatchValidator } from '../../../validators/password-match.validator';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  constructor(
    private usuariosService: UsuariosService,
    private spinnerService: NgxSpinnerService
  ){}

  form = new FormGroup({
    nome: new FormControl('',[Validators.required, Validators.minLength(8)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    senha: new FormControl('',[
      Validators.required, 
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ])
,
    senhaConfirmacao: new FormControl('',[Validators.required])
  }, {
    validators:[PasswordMatchValidator.matchPassword]
  });

  get f() {
    return this.form.controls;
  }

  /* função para capturar o SUBMIT */
  onSubmit(): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';
    const request: CriarUsuarioRequest={
      nome: this.form.value.nome as string,
      email: this.form.value.email as string,
      senha: this.form.value.senha as string
    }
    this.spinnerService.show()
    this.usuariosService.criar(request)
      .subscribe({
        next: (data) => {
          this.mensagemSucesso = `Parabéns, ${data.nome}. Sua conta foi criada com sucesso.`;
          this.form.reset();
          //console.log(data);
        },
        error: (e) =>{
          this.mensagemErro = e.error.message;
        }
      })
      .add(() =>{
        this.spinnerService.hide();
      });
    //console.log(this.form.value);
  }

}
