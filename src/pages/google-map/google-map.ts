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
  //public bus:Onibus[];
  public map: any;
  public marker: any;
  public bus = {
    "linha": "VERA CRUZ SAO CRISTOVAO",
    "rotas": [
      [-28.280337621823495, -52.371343374252326],
      [-28.27937389676426, -52.37116634845734],
      [-28.279000687168416, -52.371912002563484],
      [-28.277777117422552, -52.37171351909638],
      [-28.27688423333127, -52.37366616725922],
      [-28.280550207059587, -52.37700283527375],
      [-28.27873140854655, -52.379620671272285],
      [-28.27714879236088, -52.38054871559143],
      [-28.27563701762648, -52.38150358200074],
      [-28.273444906149916, -52.38376736640931],
      [-28.27269371964141, -52.385355234146125],
      [-28.268611707908512, -52.38930344581605],
      [-28.268125068761442, -52.39146530628205],
      [-28.266542295000786, -52.395091652870185],
      [-28.26515321447945, -52.40153431892396],
      [-28.265767435990718, -52.40438282489777],
      [-28.265923353195554, -52.40687727928162],
      [-28.26170878364624, -52.40936636924744],
      [-28.262880564105377, -52.41198420524597],
      [-28.256563191965796, -52.41612017154694],
      [-28.25358628997839, -52.41812109947205],
      [-28.253175187457575, -52.418560981750495],
      [-28.250552599584, -52.4228847026825],
      [-28.24940903656801, -52.42370009422303],
      [-28.251450429721253, -52.427809238433845],
      [-28.248133146001525, -52.430899143219]
    ],
  };
  /*public lugar=[
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
];*/

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation, private apibus: HttpServiceProvider) {
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
    var tam = this.bus.rotas.length;
    var bu = this.bus.rotas;
    var directionService = new google.maps.DirectionsService();
    var directionDisplay = new google.maps.DirectionsRenderer();
    //var bounds = new google.maps.LatLngBounds();

    let latlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));

    let mapOptions = {
      center: latlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true // desativar as configurações padrões da interface do usuário ao api
    }

    let element = document.getElementById("map");

    var map = new google.maps.Map(element, mapOptions);

    var iconmod = function () {
      return {
        fillColor: 'black',
        fillOpacity: .5,
        strokeColor: 'white',
        strokeWeight: .8,
        draggable: true,
      }
    }

    var marker = new google.maps.Marker({
      // position recebe a longitude e latitude de onde se encontra
      position: latlng,
      title: "Minha localização",
      map: map,
      icon: iconmod //"http://maps.google.com/mapfiles/ms/icons/green-dot.png"
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

    var lt = "" + bu[0][0];
    var lg = "" + bu[0][1];
    console.log("valor lt: " + lt);
    console.log("valor lg: " + lg);
    var dest = new google.maps.LatLng(
      parseFloat(lt), parseFloat(lg)
    );


    var lt2 = "" + bu[16][0];
    var lg2 = "" + bu[16][1];
    console.log("valor lt2: " + lt2);
    console.log("valor lg2: " + lg2);
    var dest2 = new google.maps.LatLng(
      parseFloat(lt2), parseFloat(lg2)
    );

    const request = {
      //oirigin pode ser uma coordenada(LatLng),uma string ou um lugar
      // obrigatório por
      origin: dest,

      // obrigatório por
      destination: dest2,
      // TravelModel Especifica o tipo de transporte a ser calculado
      travelMode: "DRIVING",
      /*unitSystem:google.maps.UnitSystem.METRIC
      É utilizado para mostrar o calculado da rota mostrado em quilometros*/
      unitSystem: google.maps.UnitSystem.METRIC,

      //opcional, especifica uma matriz de DirectionsWaypoints
      //waypoints: destination,
      /*avoidHighways( opcional ) quando definido como
      true indica que a (s) rota (s) calculada (s) deve (m)
      evitar as principais rodovias, se possível. */
      avoidHighways: false,
      /*avoidTolls( opcional ) quando definido como true
      indica que a (s) rota (s) calculada (s) deve (m) evitar
       estradas com portagem, se possível. */
      avoidTolls: false
    }


    var msg = "";
    //var resultlist = [];
    //var markerArray = [];
    var destinationIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=D|FF0000|000000';

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
      var marker2 = new google.maps.Marker({
        map: map,
        position: result,
        icon: destinationIcon
      });

      marker2.setMap(map);

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
