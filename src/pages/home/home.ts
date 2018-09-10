import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Onibus } from '../../models/Onibus';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { BusLinhaPage } from '../bus-linha/bus-linha';
import { LeafletMapPage } from '../leaflet-map/leaflet-map';
import { GoogleMapPage } from '../google-map/google-map';
import { ModestMapsPage } from '../modest-maps/modest-maps';


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
          buttons: [{ text: "Confirmar",
        handler:()=>{
          this.navCtrl.setRoot(HomePage);
        }
      }]
        })
          .present();
      }
      );

  }


  public getbus(ev: any) {

    //console.log("Dados que vem da chave EV: " + ev.target.value);

    let linha = ev.target.value;

    if (linha && linha.trim() != "" && linha.length > 0)
    {
      this.apibus.buscar(linha).subscribe(bus=>{
        console.log("Deu certo a busca");
          this.bus2=bus;
          this.flag=true;

      },
      err=>{
        /*for (const v in err) {
          console.log("Ocorreu erro, o erro foi: " + v);
        }*/

        this.flag = false;
        this.alert.create({
          title: err.error+"!!<br/>"+"Linha não encontrada!",
          subTitle:
            "Por favor procure outra linha!",
          buttons: [{
            text: "Confirmar",
            handler: () => {
              this.navCtrl.setRoot(HomePage);
            }
          }]
        })
          .present();

      });
    }
    else
    {
      this.flag=false;
    }

  }

  public horario(bus: Onibus) {
    //console.log("Valor da linha bus: " + bus.linha);
    this.navCtrl.push(BusLinhaPage, { bus });

  }

  public rota(bus: Onibus) {
    //console.log("Valor da rota bus: " + bus.linha);
    this.navCtrl.push(LeafletMapPage, { bus });

    //this.navCtrl.push(GoogleMapPage, { bus });
  }

  public mapa()
  {
    this.navCtrl.push(ModestMapsPage);
  }


}
