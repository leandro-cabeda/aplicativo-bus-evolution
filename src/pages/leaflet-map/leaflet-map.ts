import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Leaflet  from 'leaflet';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Geolocation } from '@ionic-native/geolocation';
import { Onibus } from '../../models/Onibus';

@IonicPage()
@Component({
  selector: 'page-leaflet-map',
  templateUrl: 'leaflet-map.html',
})
export class LeafletMapPage{
  public map:any;
  public bus:Onibus;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertController,
    private geolocation: Geolocation) {
    this.bus = this.navParams.get("bus");
  }

  /*ngOnInit(): void{
    this.carregarMapa();
  }*/

  /*ionViewDidLoad() {
    this.carregarMapa();
  }*/
  ionViewDidEnter() {
    this.carregarMapa();
  }

  public carregarMapa()
  {

    this.geolocation.getCurrentPosition({ enableHighAccuracy: false, maximumAge: Infinity, timeout: Infinity }).then((resp) => {
      console.log("Latitude: " + resp.coords.latitude);
      console.log("Longitude: " + resp.coords.longitude);
      console.log("Speed: " + resp.coords.speed);
      console.log("Heading: " + resp.coords.heading);
      console.log("Accuracy: " + resp.coords.accuracy);
      console.log("AltitudeAccuracy: " + resp.coords.altitudeAccuracy);
      console.log("TimeStamp: " + resp.timestamp);

    }).catch((error) => {
      console.log('Error ao buscar localização: ', error);
    });

    let watch = this.geolocation.watchPosition({ enableHighAccuracy: false, maximumAge: Infinity, timeout: Infinity });
    console.log("Dados do Watch: " + watch);
    watch.subscribe((data) => {
      console.log("Dados que veio do Data: " + data.coords + "  " + data.timestamp);
    });


    this.map = Leaflet.map("map").fitWorld();
    console.log("Entrou no carregar");
    // Isso adicionará um mapa ao dispositivo.
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
    attribution: 'BusEvolution'

      }).addTo(this.map);

    this.map.setView([-28.263721, -52.420877],18);

    Leaflet.marker([-28.263721, -52.420877]).addTo(this.map)
      .bindPopup('Olá , eu estou aqui hehehe!!!<br>')
      .openPopup();

      //Agora, quando você executar o aplicativo, verá que está sendo levado para o seu local no
      // ou melhor, o local onde seu dispositivo está no momento.

    this.map.locate({
      setView: true,
      maxZoom: 16

    }).on('locationfound', (e) => {
      console.log('Onde você se encontra agora com seu aparelho');



      /*let radius=e.accuracy/2;
      Leaflet.marker(e.latlng).addTo(this.map)
        .bindPopup('Olá , eu estou aqui hehehe!!!<br>' + "Valor de radius: " + radius)
        .openPopup();*/

      // Isso adiciona um circulo em volta onde está pela distancia.
      /*Leaflet.circle([e.latlng, radius],{
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
      }).addTo(this.map);*/

      // Isso adiciona um poligno no mapa
      /*Leaflet.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
      ]).addTo(this.map);*/

      // Trabalhando com pop-ups exemplos
      /*Leaflet.marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
      Leaflet.circle.bindPopup("I am a circle.");
      Leaflet.polygon.bindPopup("I am a polygon.");*/

      // Exemplo implementando um pop-up com seus dados de latitude e longitude e acrescentando mensagem
      /*Leaflet.popup()
        .setLatLng([51.5, -0.09])
        .setContent("I am a standalone popup.")
        .openOn(this.map);*/


        //Agora, adicionamos um grupo de recursos, criamos um marcador e adicionamos o
        //marcador à camada de feição. Em seguida, adicionamos essa camada ao mapa.
       /* let group = Leaflet.featureGroup();
      let marker: any = Leaflet.marker([e.latitude, e.longitude]).on('click', () => {


          this.alert.create({
            title:"Atenção",
            message:"Marker clicked",
            buttons:[{
              text:"Aceitar",
              handler:()=>{}
            }]
          });
        }).addTo(this.map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

      group.addLayer(marker);
      this.map.addLayer(group);*/
      }).on('locationerror', (err) => {

        console.log("Ocorreu erro: "+err);
        /*this.alert.create({
          title: "Atenção",
          message: "Ocorreu erro: "+err,
          buttons: [{
            text: "Aceitar",
            handler: () => { }
          }]
        });*/
    });


  }

}
