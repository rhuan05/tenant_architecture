import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  usuario: string = '';
  senha: string = '';

  constructor(private authService: AuthService){}

  cadastrar(event: Event){
    event.preventDefault();

    this.authService.cadastrar(this.usuario, this.senha).subscribe(
      response => {
        console.log('Usuário cadastrado com sucesso! Resposta: ' + JSON.stringify(response, null, 2));
      },
      error => {
        console.log('Erro ao cadastrar usuário', error);
      }
    )
  }
}
