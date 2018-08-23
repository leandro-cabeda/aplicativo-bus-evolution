import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Onibus } from '../../models/Onibus';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { BusLinhaPage } from '../bus-linha/bus-linha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public bus: Onibus[];
  public bus2:Onibus[];
  public flag=false;

  constructor(public navCtrl: NavController, 
    private alert: AlertController, private apibus:HttpServiceProvider) {
    

  }

  ionViewDidLoad() {

    this.apibus.listaTodos()
      .subscribe((onibus) => {
        this.bus = onibus;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.alert.create({
          title: "Falha na conexão",
          subTitle:
            "Não foi possível carregar a lista de ônibus. Tente novamente mais tarde!",
          buttons: [{ text: "Confirmar" }]
        })
          .present();
      }
      );
    
  }


  public getbus(ev: any) {

    var acentos = {
      a: /[\xE0-\xE6]/g,
      A: /[\xC0-\xC6]/g,
      e: /[\xE8-\xEB]/g,
      E: /[\xC8-\xCB]/g,
      i: /[\xEC-\xEF]/g,
      I: /[\xCC-\xCF]/g,
      o: /[\xF2-\xF6]/g,
      O: /[\xD2-\xD6]/g,
      u: /[\xF9-\xFC]/g,
      U: /[\xD9-\xDC]/g,
      c: /\xE7/g,
      C: /\xC7/g,
      n: /\xF1/g,
      N: /\xD1/g
    };
    console.log("Dados que vem da chave EV: " + ev.target.value);
    let linha = ev.target.value;

    for (let i in acentos) {

      linha = linha.replace(acentos[i], i);
    }
    console.log("Dados que vem da variavel linha: " + linha);

    if (linha && linha.trim() != "" && linha.length>0) {
      
      //console.log("Variavel linha Entrou no IF");
      this.bus2 = this.bus.filter((item) => {
        if (item.linha.toUpperCase().includes(linha.toUpperCase()))
        {
           this.flag = true;
           //console.log("Variavel linha Entrou no IF2");
           return (item.linha.toUpperCase());
        }

      });

      if (this.bus2.length == 0) {
        this.flag = false;
        this.alert.create({
          title: "Linha não encontrada",
          subTitle:
            "Por favor procure outra linha!",
          buttons: [{ text: "Confirmar"
            }]
        })
          .present();
          
      }

      //console.log(this.bus2);
      //console.log(this.flag);

    }
    else{
      this.flag=false;
      //console.log(this.flag);
    }
  
  }

  public horario(bus: Onibus) {
    console.log("Valor da linha bus: " + bus.linha);
    this.navCtrl.push(BusLinhaPage, { bus });
  }

  public rota(bus: Onibus) {
    console.log("Valor da rota bus: " + bus);
    //this.navCtrl.push(BusLinhaPage, { bus });
  }



}
