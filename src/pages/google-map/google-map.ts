import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Onibus } from '../../models/Onibus';
import { Geolocation } from '@ionic-native/geolocation';
// Só se fosse usar do nativo
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
// Fim nativo
import { HomePage } from '../home/home';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { HttpErrorResponse } from '@angular/common/http';

// Essa variavel é do namespace da própria google api, tem que ser declarada
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage {
  private alert: AlertController;
  public map: any;
  public marker: any;
  public bu: Onibus;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation, private apibus: HttpServiceProvider) {
    this.bu = this.navParams.get("bus");
  }


  ionViewDidEnter() {
    console.log("Entrou no DidEnter");
    try {
      this.carregarMapa();
      //this.buscarLinhas();

    } catch (error) {
      this.alert.create({
        title: "Alerta",
        subTitle: "Ocorreu erro no Carregamento dos dados",
        buttons: [{
          text: "Confirmar",
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }]
      });
    }


  }

  /*public buscarLinhas()
  {
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
          buttons: [{
            text: "Confirmar",
            handler: () => {
              this.navCtrl.setRoot(HomePage);
            }
          }]
        })
          .present();
      }
      );
  }*/

  public carregarMapa() {
    console.log("Entrou na função carregarmapa");
    this.geolocation.getCurrentPosition().then(result => {
      //this.loadMap(result.coords.latitude,result.coords.longitude);
      this.carregaRota(result.coords.latitude, result.coords.longitude);

    }).catch(err => {
      this.alert.create({
        title: "Alerta!!",
        subTitle: "GPS está fora",
        buttons: [{
          text: "Confirmar",
          handler: () => {
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

  /*public loadPoints() {
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
  }*/

  public carregaRota(lat, lng) {
    //this.loadPoints();
    var directionService = new google.maps.DirectionsService();
    var directionDisplay = new google.maps.DirectionsRenderer();
    //var bounds = new google.maps.LatLngBounds();

    let latlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng)); // pega coordenada da latitudo e longitude do ponto do usuário

    let mapOptions = {  // cria as opções para atribuir no mapa
      center: latlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true // desativar as configurações padrões da interface do usuário ao api
    }

    let element = document.getElementById("map"); // pega o elemento do id do mapa e atribui pra variavel

    var map = new google.maps.Map(element, mapOptions); // Criar o mapa com elemento e a opção


    var marker = new google.maps.Marker({ // Cria o marcador da localização do usuário com as opções
      // position recebe a longitude e latitude de onde se encontra
      position: latlng,
      title: "Minha localização",
      map: map,
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    });

    marker.setMap(map); // seta o marker no mapa


    // cria um content atribuindi uma caixa de dialogo com titulo do marker em coortenação
    var content = '<div id="myId" class="item item-thumbnail-left item-text-wrap">' +
      '<ion-item>' +
      '<ion-row>' +
      '<h6>' + marker.title + '</h6>' +
      '</ion-row>' +
      '</ion-item>' +
      '</div>';


    directionDisplay.setMap(map);
    //var geocoder = new google.maps.Geocoder();
    //let service = new google.maps.DistanceMatrixService;


    //var origem={lat:parseFloat(lat),lng:parseFloat(lng)};

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

    //var destination = new google.maps.LatLng(this.lugar[0].lat,this.lugar[0].lng);


    // Testando com o objeto que tem conjuntos de rotas e atribui na variavel bu
    var bu =this.bu.rotas;
    var destinationIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=D|FF0000|000000';
    var msg = "";
    console.log("Valor variavel bu: " + bu);
    for (var i = 0; i < bu.length; i++) {

      if (i == 0) {
        var og = "" + bu[i][0];
        var og2 = "" + bu[i][1];
        var or = new google.maps.LatLng(parseFloat(og), parseFloat(og2));
      }
      if (i == bu.length - 1) {
        var r = "" + bu[i][0];
        var r2 = "" + bu[i][1];
        var rot = new google.maps.LatLng(parseFloat(r), parseFloat(r2));
      }
    }

    // Cria uma request com as configurações de origim e destino e outros para adicionar a DirectionService Route
    const request = {
      //oirigin pode ser uma coordenada(LatLng),uma string ou um lugar
      // obrigatório por
      origin: or,

      // obrigatório por
      destination: rot,
      // TravelModel Especifica o tipo de transporte a ser calculado
      travelMode: "DRIVING",
      /*unitSystem:google.maps.UnitSystem.METRIC
      É utilizado para mostrar o calculado da rota mostrado em quilometros*/
      unitSystem: google.maps.UnitSystem.METRIC,

      //opcional, especifica uma matriz de DirectionsWaypoints
      //waypoints: ,

      // Evitar as balsas se possiveis se for true
      avoidFerries:false,
      /*avoidHighways( opcional ) quando definido como
      true indica que a (s) rota (s) calculada (s) deve (m)
      evitar as principais rodovias, se possível. */
      avoidHighways: false,
      /*avoidTolls( opcional ) quando definido como true
      indica que a (s) rota (s) calculada (s) deve (m) evitar
       estradas com portagem, se possível. */
      avoidTolls: false
    }


    //var resultlist = [];
    //var markerArray = [];

    directionService.route(request, (result, status) => {
      //resultlist.push(result);
      switch (status) {
        case "OK":
          directionDisplay.setDirections(result);
          //map.fitBounds(bounds.extend(result));
          break;

        case "NOT_FOUND":
          msg = "Local ou destino de algum ponto não pode ser geocodificado!!";

          break;

        case "ZERO_RESULTS":
          msg = "Não foi encontrado nenhuma rota entre origem e destino";
          break;

        case "INVALID_REQUEST":
          msg = "Inválido solicitação, está faltando origem ou destino";

          break;

        case "OVER_QUERY_LIMIT":
          msg = "A página enviou muitas solicitações dentro do seu limite permitido. Pedimos desculpa!";
          break;
        case "REQUEST_DENIED":
          msg = "Pedimos desculpa, mas a página da web não tem permissão para usar esse percurso de rota";
          break;

        case "UNKNOWN_ERROR":
          msg = "A Rota não pode ser processada por motivo de erro no servidor. Pedimos desculpa";
          break;

        default:
          msg = "Foram indicados muitos pontos de rota ou a rota solicitada é muito longa e não pode ser processada";
          break;

      }

      if (status != "OK") {
        this.alert.create({
          title: "Alerta",
          message: msg,
          buttons: [{
            text: "Confirmar",
            handler: () => {
              this.navCtrl.setRoot(HomePage);
            }
          }]
        });
      }
      /*else if (status == "OK") {
        for (let i = 0; i < resultlist.length; i++) {
          geocoder.geocode({ "address": resultlist[i] });
          markerArray.push(new google.maps.Marker({
            map: map,
            position: result,
            icon: destinationIcon
          }));
        }
      }*/


    });

    this.addinfowindow(marker, content);

  }

  public addinfowindow(marker, content) {
    //console.log("Entrou na função addinfowindow");
    let infowindow = new google.maps.InfoWindow({
      content: content
    });
    infowindow.open(this.map, marker); // já deixa mostrando o conteudo da descrição

    google.maps.event.addListener(marker, "click", () => {
      // Isso faz quando clicar no marcador faz apareçer a descrição que foi enviado
      infowindow.open(this.map, marker);
    });

  }

}
