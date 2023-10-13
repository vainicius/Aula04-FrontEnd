import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Livro } from 'src/app/models/livro';
import { CarroService } from 'src/app/services/carro.service';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livros-details',
  templateUrl: './livros-details.component.html',
  styleUrls: ['./livros-details.component.scss']
})
export class LivrosDetailsComponent {
  @Input() livro: Livro = new Livro();
  @Output() retorno = new EventEmitter<Livro>();

  livrosService = inject(LivroService);
  modalService: any;
  
  isDeletar = false;

  constructor() {
  }

  
  openModal(modal: any) {
    this.modalService.open(modal, { size: 'sm' });
  }


  save(livro: Livro) {
  
    this.livrosService.save(livro).subscribe({
      next: (novoLivro) => {
        console.log(novoLivro);
        this.retorno.emit(livro);
        console.log('cadastrando')
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

}
