import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carro } from 'src/app/models/carro';
import { CarroService } from 'src/app/services/carro.service';

@Component({
  selector: 'app-carros-list',
  templateUrl: './carros-list.component.html',
  styleUrls: ['./carros-list.component.scss']
})
export class CarrosListComponent {
  lista: Carro[] = [];
  carro!: Carro;
  @Output() retorno = new EventEmitter<Carro>();


  
  carroSelecionadaParaEdicao: Carro = new Carro();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  carroService = inject(CarroService);
  isDeletar = false;

  constructor() {

    this.listAll();
    //this.exemploErro();
  }


  listAll() {

    this.carroService.listAll().subscribe({
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

    this.carroService.exemploErro().subscribe({
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
  
  

  editar(modal: any, carro: Carro, indice: number) {
    this.carroSelecionadaParaEdicao = Object.assign({}, carro); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'sm' });
    this.carroService.put(carro).subscribe({
      next: (carroEditado) => {
        console.log(carroEditado);
      },
      error: (erro) => {
        console.log(erro);
      }
    })
  }

  addOuEditarCarro(carro: Carro) {
    this.listAll();
    this.modalService.dismissAll();
  }
  deletar(carro: Carro){
    this.lista = this.lista.filter(item => item.id !== carro.id);
    this.carroService.delete(carro).subscribe();
  }
}
