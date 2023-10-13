import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Carro } from 'src/app/models/carro';
import { CarroService } from 'src/app/services/carro.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-carros-detail',
  templateUrl: './carros-detail.component.html',
  styleUrls: ['./carros-detail.component.scss']
})
export class CarrosDetailComponent {
  @Input() carro: Carro = new Carro();
  @Output() retorno = new EventEmitter<Carro>();

  carroService = inject(CarroService);
  modalService: any;
  
  isDeletar = false;

  constructor() {
  }

  
  openModal(modal: any) {
    this.modalService.open(modal, { size: 'sm' });
  }


  save(carro: Carro) {
  
    this.carroService.save(carro).subscribe({
      next: (novoCarro) => {
        console.log(novoCarro);
        this.retorno.emit(carro);
        console.log('cadastrando')
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }



}
