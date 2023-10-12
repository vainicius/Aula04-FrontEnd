import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoaslist',
  templateUrl: './pessoaslist.component.html',
  styleUrls: ['./pessoaslist.component.scss']
})
export class PessoaslistComponent {

  lista: Pessoa[] = [];
  pessoa!: Pessoa;
  @Output() retorno = new EventEmitter<Pessoa>();


  
  pessoaSelecionadaParaEdicao: Pessoa = new Pessoa();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  pessoaService = inject(PessoaService);
  isDeletar = false;

  constructor() {

    this.listAll();
    //this.exemploErro();
  }


  listAll() {

    this.pessoaService.listAll().subscribe({
      next: lista => { // QUANDO DÁ CERTO
        this.lista = lista;
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  exemploErro() {

    this.pessoaService.exemploErro().subscribe({
      next: lista => { // QUANDO DÁ CERTO
        this.lista = lista;
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  openModal(modal: any) {
    this.modalService.open(modal, { size: 'sm' });
  }
  
  

  editar(modal: any, pessoa: Pessoa, indice: number) {
    this.pessoaSelecionadaParaEdicao = Object.assign({}, pessoa); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'sm' });
    this.pessoaService.put(pessoa).subscribe({
      next: (pessoaEditada) => {
        console.log(pessoaEditada);
      },
      error: (erro) => {
        console.log(erro);
      }
    })
  }

  addOuEditarPessoa(pessoa: Pessoa) {
    this.listAll();
    this.modalService.dismissAll();
  }
  deletar(pessoa: Pessoa){
    this.lista = this.lista.filter(item => item.id !== pessoa.id);
    this.pessoaService.delete(pessoa).subscribe();
  }

}
