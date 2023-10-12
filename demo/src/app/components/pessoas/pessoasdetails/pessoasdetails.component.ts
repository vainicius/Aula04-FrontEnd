import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoasdetails',
  templateUrl: './pessoasdetails.component.html',
  styleUrls: ['./pessoasdetails.component.scss']
})
export class PessoasdetailsComponent {

  @Input() pessoa: Pessoa = new Pessoa();
  @Output() retorno = new EventEmitter<Pessoa>();

  pessoaService = inject(PessoaService);
  modalService: any;
  
  isDeletar = false;

  constructor() {
  }
/*
  salvar() {
    //ISSO AQUI SERVE PARA EDITAR OU ADICIONAR... TANTO FAZ

    this.pessoaService.save(this.pessoa).subscribe({
      next: pessoa => { // QUANDO DÁ CERTO
        this.retorno.emit(pessoa);
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });



  }
  */
  
  openModal(modal: any) {
    this.modalService.open(modal, { size: 'sm' });
  }


  save(pessoa: Pessoa) {
  
    this.pessoaService.save(pessoa).subscribe({
      next: (novaPessoa) => {
        console.log(novaPessoa);
        this.retorno.emit(pessoa);
        console.log('cadastrando')
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }



}
