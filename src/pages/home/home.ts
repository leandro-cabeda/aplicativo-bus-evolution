import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Onibus } from '../../models/Onibus';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public bus: Onibus[];
  public flag=false;

  constructor(public navCtrl: NavController, //private loadingCtrl: LoadingController, 
    private alert: AlertController, private apibus:HttpServiceProvider) {

  }

  ionViewDidLoad() {

    /*let loader = this.loadingCtrl.create({
      content: "Buscando Linhas de Ônibus. Aguarde..."
    });

    loader.present();*/

    this.apibus.listaTodos()
      .subscribe((onibus) => {
        this.bus = onibus;

       /* setTimeout(function () {
          loader.dismiss();
        }, 1000);*/
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        //loader.dismiss();
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
    console.log("Dados que vem da chave EV: " + ev.target.value);
    let linha = ev.target.value;
    console.log("Dados que vem da variavel linha: " + linha);

    if (linha && linha.trim() != "") {
      this.flag = true;
      console.log("Variavel linha Entrou no IF");
      this.bus = this.bus.filter((item) => {

        return (item.linha.toLocaleUpperCase().indexOf(linha.toLocaleUpperCase()) > -1);
      });

    }
    else{
      this.flag=false;
    }
  
  }

  public buscar(bus: Onibus) {
    console.log("Valor da chave bus: " + bus);
    //this.navCtrl.push(BuslinhaPage, { bus });
  }



}
