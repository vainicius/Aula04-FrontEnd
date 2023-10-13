import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livros-list',
  templateUrl: './livros-list.component.html',
  styleUrls: ['./livros-list.component.scss']
})
export class LivrosListComponent {
  lista: Livro[] = [];
  livro!: Livro;
  @Output() retorno = new EventEmitter<Livro>();


  
  livroSelecionadoParaEdicao: Livro = new Livro();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  livroService = inject(LivroService);
  isDeletar = false;

  constructor() {

    this.listAll();
    //this.exemploErro();
  }


  listAll() {

    this.livroService.listAll().subscribe({
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

    this.livroService.exemploErro().subscribe({
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
  
  

  editar(modal: any, livro: Livro, indice: number) {
    this.livroSelecionadoParaEdicao = Object.assign({}, livro); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'sm' });
    this.livroService.put(livro).subscribe({
      next: (livroEditado) => {
        console.log(livroEditado);
      },
      error: (erro) => {
        console.log(erro);
      }
    })
  }

  addOuEditarLivro(livro: Livro) {
    this.listAll();
    this.modalService.dismissAll();
  }
  deletar(livro: Livro){
    this.lista = this.lista.filter(item => item.id !== livro.id);
    this.livroService.delete(livro).subscribe();
  }
}
