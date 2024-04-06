import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthHelper } from '../../../helpers/auth.helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isAuthenticated: boolean = false;
  nomeUsuario: string = '';
  emailUsuario: string = '';
  constructor(
      private authHelper: AuthHelper,
      private router: Router
  ){}
  ngOnInit(): void {
    const usuario = this.authHelper.getUser();
    if (usuario != null){
      this.isAuthenticated = true;
      this.nomeUsuario = usuario.nome;
      this.emailUsuario = usuario.email;
    }
  }

  logout() : void {
    if (confirm('Deseja realmente sair do sistema')){
      this.authHelper.signOut();
      this.router.navigate(['pages/autenticar-usuario'])
        .then(() => {
          location.reload();
        })
    }
  }
}
