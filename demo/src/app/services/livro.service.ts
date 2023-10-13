import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  API: string = 'http://localhost:8080/api/livro';
  http = inject(HttpClient);


  constructor() { }

  listAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.API}/todos`);
}

save(livro: Livro): Observable<Livro> {
  return this.http.post<Livro>(`${this.API}/cadastrar`, livro);
}

exemploErro(): Observable<Livro[]> {
  return this.http.get<Livro[]>(this.API + '/erro');
}

put(livro: Livro): Observable<Livro> {
  return this.http.put<Livro>(`${this.API}/editar/${livro.id}`,livro);
} 

delete(livro: Livro): Observable<Livro>{
  console.log('chegou')

  return this.http.delete<Livro>(`${this.API}/deletar/${livro.id}`);
}

}
