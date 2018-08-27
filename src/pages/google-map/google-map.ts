import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Onibus } from '../../models/Onibus';
import { Geolocation } from '@ionic-native/geolocation';

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

  /*ngOnInit(): void {
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
    this.geolocation.getCurrentPosition().then(result=>{
      this.loadMap(result.coords.latitude,result.coords.longitude);
    });
  }

  public loadMap(lat,lng)
  {
    let latlng= new google.maps.LatLng(lat,lng);

    let mapOptions={
      // minha localização de latitude e longitude
      center:latlng,
      zoom:14,
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

  }

  public addinfowindow(marker,content)
  {
    let infowindow= new google.maps.InfoWindow({
      content:content
    });

    google.maps.event.addListener(marker,"click",()=>{
      // Isso faz quando clicar no marcador faz apareçer a descrição que foi enviado
      infowindow.open(this.map,marker);
    });

  }

  public loadPoints() {
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

}
