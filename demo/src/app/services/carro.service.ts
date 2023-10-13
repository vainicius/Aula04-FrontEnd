import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Carro } from '../models/carro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  API: string = 'http://localhost:8080/api/carro';
  http = inject(HttpClient);


  constructor() { }

  listAll(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.API}/todos`);
}

save(carro: Carro): Observable<Carro> {
  return this.http.post<Carro>(`${this.API}/cadastrar`, carro);
}

exemploErro(): Observable<Carro[]> {
  return this.http.get<Carro[]>(this.API + '/erro');
}

put(carro: Carro): Observable<Carro> {
  return this.http.put<Carro>(`${this.API}/editar/${carro.id}`,carro);
}

delete(carro: Carro): Observable<Carro>{
  console.log('deletou')

  return this.http.delete<Carro>(`${this.API}/deletar/${carro.id}`);
}


}
