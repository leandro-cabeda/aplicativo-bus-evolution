import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Onibus } from '../../models/Onibus';

@Injectable()
export class HttpServiceProvider {
  //public url ="https://api-bus-evolution.herokuapp.com/api/buscalinhas";
  //public url = "https://localhost:6000/api";

  constructor(public http: HttpClient) {
    
  }

  public listaTodos() {
    //return this.http.get<Onibus[]>(this.url + "/buscalinhas");
    //return this.http.get<Onibus[]>("https://api-bus-evolution.herokuapp.com/api/buscalinhas");
    return this.http.get<Onibus[]>("http://localhost:8080/api/buscalinhas");


  }

  public buscar(linha: String) {
    //return this.http.get<Onibus[]>(this.url+"/buscalinhas/"+linha);

  }

}
