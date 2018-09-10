import { HomePage } from './../home/home';
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Leaflet  from 'leaflet';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Onibus } from '../../models/Onibus';
import { BusLinhaPage } from '../bus-linha/bus-linha';

declare const L:any;
var map;

@IonicPage()
@Component({
  selector: 'page-leaflet-map',
  templateUrl: 'leaflet-map.html',
})
export class LeafletMapPage{

  public bus:Onibus;
  private alert: AlertController;


  constructor(public navCtrl: NavController, public navParams: NavParams){
    this.bus = this.navParams.get("bus");
  }


  ionViewDidEnter() {
    try {
      this.carregarMapa();
    } catch (error) {
      this.alert.create({
        title:"Alerta",
        subTitle:"Ocorreu erro no Carregamento do Mapa da Rota",
        buttons:[{
          text:"Confirmar",
          handler:()=>{
            this.navCtrl.setRoot(HomePage);
          }
        }]
      });

    }

  }

  public carregarMapa()
  {

    let bu=this.bus.rotas;
    // setView mostra determinada latitude e longitude já de um ponto e o 14 é zoom ja definido
    map = Leaflet.map("map").setView([bu[0][0],bu[0][1]],14);
     //fitWorld() = Mostra mapa do mundo todo;
    console.log("Entrou no carregar");
    // Isso adicionará um mapa ao dispositivo.
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'BusEvolution',
      maxZoom: 18
    }).addTo(map);


    var options = {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 8,
      opacity: 1
    };
    Leaflet.polyline(bu, options).addTo(map);

    for(let i=0;i<bu.length;i++)
    {
      if(i==0 || i==bu.length-1)
      {
        Leaflet.marker([bu[i][0],bu[i][1]]).addTo(map).
            bindPopup("Rotina do Ônibus!!")
            .openPopup();

      Leaflet.circle([bu[i][0], bu[i][1]], options).addTo(map);
      }

    }

    setTimeout(function () {
      map.locate({ setView: true });
      function locationfound(e)
      {
      var radius = e.accuracy / 8;
      Leaflet.marker(e.latlng).addTo(map)
        .bindPopup('Você se encontra aqui neste momento!!!<br>' + "Distância: " + radius + " metros deste ponto")
        .openPopup();

      Leaflet.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: radius
      }).addTo(map);

        map.setView([e.latlng.lat, e.latlng.lng], 13);
        Leaflet.polyline(e.latlng, options).addTo(map);


    }
    map.on("locationfound", locationfound);
    }, 10000);

  }

}
