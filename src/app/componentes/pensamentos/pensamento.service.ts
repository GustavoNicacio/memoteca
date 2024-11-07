import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos'

  constructor(private http: HttpClient) {}

  listar(pagina: number): Observable<Pensamento[]> {

    const itensPorPagina = 6

    let params = new HttpParams()
    .set("_page", pagina.toString())
    .set("_limit", itensPorPagina.toString());

    console.log(params)
    return this.http.get<Pensamento[]>(this.API, { params })
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento)
  }
  editar(pensamento: Pensamento) {
    const URL = `${this.API}/${pensamento.id}`
    return this.http.put(URL, pensamento)
  }

  excluir(id: string ): Observable<Pensamento> {
    const URL = `${this.API}/${id}`
    return this.http.delete<Pensamento>(URL)
  }

  buscarPorId(id: string): Observable<Pensamento> {
    const URL = `${this.API}/${id}`
    return this.http.get<Pensamento>(URL)
  }

}
