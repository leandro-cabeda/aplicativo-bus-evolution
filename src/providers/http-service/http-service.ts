import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Onibus } from '../../models/Onibus';

@Injectable()
export class HttpServiceProvider {
  public url ="https://api-bus-evolution.herokuapp.com/api";
  public url2 = "http://localhost:8080/api";

  constructor(public http: HttpClient) {
    
  }

  public listaTodos() {
    //return this.http.get<Onibus[]>(this.url + "/buscalinhas");
    
    return this.http.get<Onibus[]>(this.url2+"/buscalinhas");


  }

  public buscar(linha: string) {
    //return this.http.get<Onibus[]>(this.url+"/buscalinhas/"+linha);

    return this.http.get<Onibus[]>(this.url2 + "/buscalinhas/"+linha);

  }

}
