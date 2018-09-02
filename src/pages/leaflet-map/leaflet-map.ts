import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Leaflet  from 'leaflet';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
//import { Geolocation } from '@ionic-native/geolocation';
import { Onibus } from '../../models/Onibus';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';


declare const L:any;
var map;

@IonicPage()
@Component({
  selector: 'page-leaflet-map',
  templateUrl: 'leaflet-map.html',
})
export class LeafletMapPage{

  public bus:Onibus;
  public marc:any;
  public lat:any;
  public lng:any;
  public latlng:any;


  constructor(public navCtrl: NavController, public navParams: NavParams){//, private alert: AlertController){
    //private geolocation: Geolocation) {
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
    /*
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
    });*/


     map = Leaflet.map("map").fitWorld();
    console.log("Entrou no carregar");
    // Isso adicionará um mapa ao dispositivo.
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'BusEvolution',
		  maxZoom: 18
    }).addTo(map);
    //L.Control.geocoder().addTo(map);

  //Isso adicionará um polígono que representa
  //a caixa delimitadora do resultado quando um resultado é selecionado.
    let geocoder = L.Control.geocoder({
      defaultMarkGeocode: false
    })
      .on('markgeocode', function (e) {
        let bbox = e.geocode.bbox;
        let poly = L.polygon([
          bbox.getSouthEast(),
          bbox.getNorthEast(),
          bbox.getNorthWest(),
          bbox.getSouthWest()
        ]).addTo(map);
        map.fitBounds(poly.getBounds());
      })
      .addTo(map);

    // Isso é ponto onde usuário se encontra
    map.locate({ setView: true });



    function locationfound(e)
    {
      console.log("Valor de locationfound: "+e);
      var radius = e.accuracy / 8;
      this.lat=e.latlng.lat;
      this.lng=e.latlng.lng;
      //this.latlng=e.latlng;

      console.log("Latitude minha: "+this.lat+"<br>"+"Longitude minha: "+this.lng);
      Leaflet.marker(e.latlng).addTo(map)
      .bindPopup('Olá , eu estou aqui hehehe!!!<br>' + "Distância: " + radius+ " metros do ponto")
      .openPopup();

      Leaflet.circle(e.latlng,{
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: radius
      }).addTo(map);
    }


    map.on("locationfound", locationfound);


    function locationerror(err)
    {
      console.log("Valor de locationerror: " + err);
    }

    map.on("locationerror", locationerror);

    /*this.map.setView([-28.263721, -52.420877],18);

    Leaflet.marker([-28.263721, -52.420877]).addTo(this.map)
      .bindPopup('Olá , eu estou aqui hehehe!!!<br>')
      .openPopup();*/

      //Agora, quando você executar o aplicativo, verá que está sendo levado para o seu local no
      // ou melhor, o local onde seu dispositivo está no momento.

    /*this.map.locate({
      setView: true,
      maxZoom: 16

    }).on('locationfound', (e) => {
      console.log('Onde você se encontra agora com seu aparelho');*/



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
      //}).on('locationerror', (err) => {

        //console.log("Ocorreu erro: "+err);
        /*this.alert.create({
          title: "Atenção",
          message: "Ocorreu erro: "+err,
          buttons: [{
            text: "Aceitar",
            handler: () => { }
          }]
        });*/
    //});


  }

  MostrarLatLng()
  {

    /* Exemplo de GeoJSON objetos
    var states = [{
      "type": "Feature",
      "properties": { "party": "Republican" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-104.05, 48.99],
          [-97.22, 48.98],
          [-96.58, 45.94],
          [-104.03, 45.94],
          [-104.05, 48.99]
        ]]
      }
    }, {
      "type": "Feature",
      "properties": { "party": "Democrat" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-109.05, 41.00],
          [-102.06, 40.99],
          [-102.03, 36.99],
          [-109.04, 36.99],
          [-109.05, 41.00]
        ]]
      }
    }];

    L.geoJSON(states, {
      style: function (feature) {
        switch (feature.properties.party) {
          case 'Republican': return { color: "#ff0000" };
          case 'Democrat': return { color: "#0000ff" };
        }
      }
    }).addTo(map);*/

    let map2=map;
    let popup=L.popup();


    function mapclick(e)
    {

      console.log("valor lat: "+e.latlng.lat+"<br>"+"valor lng: "+e.latlng.lng);
      /*
      let myLines = [{
        "type": "LineString",
        "coordinates": [[e.latlng.lat, e.latlng.lng], [e.latlng.lat, e.latlng.lng], [e.latlng.lat, e.latlng.lng]]
      }, {
        "type": "LineString",
          "coordinates": [[e.latlng.lat, e.latlng.lng], [e.latlng.lat, e.latlng.lng], [e.latlng.lat, e.latlng.lng]]
      }];

      var myStyle = {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
      };

      L.geoJSON(myLines, {
        style: myStyle
      }).addTo(map2);
      */
      //L.Control.geocoder().addTo(map2);

      let geocoder = L.Control.geocoder({
        defaultMarkGeocode: false
      })
        .on('markgeocode', function (e) {
          let bbox = e.geocode.bbox;
          let poly = L.polygon([
            bbox.getSouthEast(),
            bbox.getNorthEast(),
            bbox.getNorthWest(),
            bbox.getSouthWest()
          ]).addTo(map2);
          map2.fitBounds(poly.getBounds());
        })
        .addTo(map2);

      Leaflet.Routing.control({
        waypoints: [
          L.latLng(parseFloat(this.lat), parseFloat(this.lng)),
          L.latLng(parseFloat(e.latlng.lat), parseFloat(e.latlng.lng))
        ]
        //routeWhileDragging: true,
        //geocoder: L.Control.Geocoder.nominatim()
      }).addTo(map2);



      popup.setLatLng(e.latlng)
      .setContent("Latitude e Lontitude deste local é:<br> "+e.latlng.toString())
      .openOn(map2);
      console.log("Valores coordenadas latlng: " + e.latlng.toString());
    }

    if(this.marc==1)
    {
      map2.on("click",mapclick);
      this.marc=0;
    }
    else
    {
      map2.off("click");
      this.marc=1;
    }
    console.log("Valor da variavel marc: " + this.marc);


  }

}
