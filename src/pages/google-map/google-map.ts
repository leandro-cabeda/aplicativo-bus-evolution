import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Onibus } from '../../models/Onibus';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { HomePage } from '../home/home';

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage{
  public bus:Onibus;
  public map:any;
  public marker:any;
  public lat:any;
  public lng:any;
  public lugar=[
  {
    "nome":"lugar 1",
      "lat": -28.264988,
      "lng": - 52.418995
  },
  {
    "nome": "lugar 2",
    "lat": -28.265800,
    "lng": - 52.419381
  }
];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alert: AlertController,
    private geolocation: Geolocation) {
    this.bus = this.navParams.get("bus");
  }


  ionViewDidEnter() {
    console.log("Entrou no DidEnter");
      this.carregarMapa();

  }

  public carregarMapa()
  {
    console.log("Entrou na função carregarmapa");
    this.geolocation.getCurrentPosition().then(result=>{
      //this.loadMap(result.coords.latitude,result.coords.longitude);
      this.carregaRota(result.coords.latitude, result.coords.longitude);
      this.lat=result.coords.latitude;
      this.lng=result.coords.longitude;
    }).catch(err=>{
      this.alert.create({
        title: "Alerta!!",
        subTitle: "GPS está fora",
        buttons:[{
          text: "Confirmar",
          handler:()=>{
            this.navCtrl.setRoot(HomePage);
          }
        }]
      });
    });
  }

 /* public loadMap(lat,lng)
  {
    console.log("Entrou na função loadmap");
    let latlng= new google.maps.LatLng(lat,lng);

    let mapOptions={
      // minha localização de latitude e longitude
      center:latlng,
      zoom:16,
      // esse tipo será tipo de mapa terrestre
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      disableDefaultUI:true
    }

    let element=document.getElementById("map");

    this.map=new google.maps.Map(element,mapOptions);

    // Faz a marcação onde gente se encontra
    let marker= new google.maps.Marker({
      // position recebe a longitude e latitude de onde se encontra
      position: latlng,
      title: "Minha localização",
      icon:"http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    });

    let content='<div id="myId" class="item item-thumbnail-left item-text-wrap">'+
      '<ion-item>'+
        '<ion-row>'+
          '<h6>'+marker.title+'</h6>'+
        '</ion-row>'+
      '</ion-item>'+
    '</div>';

    marker.setMap(this.map);

    this.addinfowindow(marker,content);

    this.loadPoints();

  }*/

  public addinfowindow(marker,content)
  {
    console.log("Entrou na função addinfowindow");
    let infowindow= new google.maps.InfoWindow({
      content:content
    });

    google.maps.event.addListener(marker,"click",()=>{
      // Isso faz quando clicar no marcador faz apareçer a descrição que foi enviado
      infowindow.open(this.map,marker);
    });

  }

  public loadPoints() {
    console.log("Entrou na função loadPoints");
    this.marker = [];

    for (const key of Object.keys(this.lugar)) {
      let latlng = new google.maps.LatLng(this.lugar[key].lat, this.lugar[key].lng);
      let marker = new google.maps.Marker({
        position: latlng,
        title: this.lugar[key].nome
      });

      let content = '<div id="myId" class="item item-thumbnail-left item-text-wrap">' +
        '<ion-item>' +
        '<ion-row>' +
        '<h6>' + this.lugar[key].nome + '</h6>' +
        '</ion-row>' +
        '</ion-item>' +
        '</div>';

      this.addinfowindow(marker, content);
      marker.setMap(this.map);
    }
  }

  public carregaRota(lat,lng)
  {
    this.loadPoints();
    var directionService = new google.maps.DirectionsService();
    var directionDisplay = new google.maps.DirectionsRenderer();
    var bounds = new google.maps.LatLngBounds();

    let latlng = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: latlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let element = document.getElementById("map");

    var map = new google.maps.Map(element, mapOptions);

    var marker = new google.maps.Marker({
      // position recebe a longitude e latitude de onde se encontra
      position: latlng,
      title: "Minha localização",
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    });
    marker.setMap(map);

    var content = '<div id="myId" class="item item-thumbnail-left item-text-wrap">' +
      '<ion-item>' +
      '<ion-row>' +
      '<h6>' + marker.title + '</h6>' +
      '</ion-row>' +
      '</ion-item>' +
      '</div>';

    directionDisplay.setMap(map);
    var geocoder = new google.maps.Geocoder();
    //let service = new google.maps.DistanceMatrixService;


    var origem={lat:parseFloat(lat),lng:parseFloat(lng)};

    // Configuração da direction request route da google api
    /* origin: LatLng | String | google.maps.Place,
        destination: LatLng | String | google.maps.Place,
        travelMode: TravelMode,
        transitOptions: TransitOptions,
        drivingOptions: DrivingOptions,
        unitSystem: UnitSystem,
        waypoints[]: DirectionsWaypoint,
        optimizeWaypoints: Boolean,
        provideRouteAlternatives: Boolean,
        avoidFerries: Boolean,
        avoidHighways: Boolean,
        avoidTolls: Boolean,
        region: String */

    var destination = new google.maps.LatLng(this.lugar[0].lat,this.lugar[0].lng);

    const request={
      //oirigin pode ser uma coordenada(LatLng),uma string ou um lugar
      origin: origem,
      destination: destination,
      // TravelModel Especifica o tipo de transporte a ser calculado
      travelMode:"TRANSIT",
      /*unitSystem:google.maps.UnitSystem.METRIC
      É utilizado para mostrar o calculado da rota mostrado em quilometros*/
      unitSystem: google.maps.UnitSystem.METRIC,
      /*avoidHighways( opcional ) quando definido como
      true indica que a (s) rota (s) calculada (s) deve (m)
      evitar as principais rodovias, se possível. */
      avoidHighways: false,
      /*avoidTolls( opcional ) quando definido como true
      indica que a (s) rota (s) calculada (s) deve (m) evitar
       estradas com portagem, se possível. */
      avoidTolls: false
    }
    var msg="";
    var resultlist=[];
    var markerArray=[];
    var destinationIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=D|FF0000|000000';

    directionService.route(request,(result,status)=>{
      resultlist.push(result);
      switch(status)
      {
        case "OK":
          directionDisplay.setDirections(result);
          map.fitBounds(bounds.extend(result));
        break;

        case "NOT_FOUND":
          msg = "Local ou destino de algum ponto não pode ser geocodificado!!";

          break;

        case "ZERO_RESULTS":
          msg = "Não foi encontrado nenhuma rota entre origem e destino";
          break;

        case "INVALID_REQUEST":
          msg="Inválido solicitação, está faltando origem ou destino";

          break;

        case "OVER_QUERY_LIMIT":
          msg="A página enviou muitas solicitações dentro do seu limite permitido. Pedimos desculpa!";
          break;
        case "REQUEST_DENIED":
          msg="Pedimos desculpa, mas a página da web não tem permissão para usar esse percurso de rota";
          break;

        case "UNKNOWN_ERROR":
          msg="A Rota não pode ser processada por motivo de erro no servidor. Pedimos desculpa";
          break;

        default:
          msg="Foram indicados muitos pontos de rota ou a rota solicitada é muito longa e não pode ser processada";
        break;

      }

      if(status!="OK")
      {
        this.alert.create({
          title:"Alerta",
          message:msg,
          buttons:[{
            text:"Confirmar",
            handler:()=>{
              this.navCtrl.setRoot(HomePage);
            }
          }]
        });
      }

      if(status=="OK")
      {
        for(let i=0;i<resultlist.length;i++)
        {
          geocoder.geocode({"address":resultlist[i]});
          markerArray.push(new google.maps.Marker({
            map:map,
            position: result,
            icon: destinationIcon
          }));
        }
      }

    });

    this.addinfowindow(marker, content);

  }

}
