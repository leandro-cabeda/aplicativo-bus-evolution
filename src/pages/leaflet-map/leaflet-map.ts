import { Component, OnInit } from '@angular/core';
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
export class LeafletMapPage implements OnInit{
  public map:any;
  public bus:Onibus;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertController,
    private geolocation: Geolocation) {
    this.bus = this.navParams.get("bus");
  }

  ngOnInit(): void{
    this.carregarMapa();
  }

  ionViewDidLoad() {
    //this.carregarMapa();
  }

  public carregarMapa()
  {
    this.map = Leaflet.map("map").fitWorld();
    console.log("Entrou no carregar");
    // Isso adicionará um mapa ao dispositivo.
    Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
      }).addTo(this.map);

    Leaflet.marker([51.5, -0.09]).addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();


	function onLocationFound(e) {
		var radius = e.accuracy / 2;

		Leaflet.marker(e.latlng).addTo(this.map)
			.bindPopup("You are within " + radius + " meters from this point").openPopup();

		Leaflet.circle(e.latlng, radius).addTo(this.map);
	}

	function onLocationError(e) {
		alert(e.message);
	}

	this.map.on('locationfound', onLocationFound);
	this.map.on('locationerror', onLocationError);

	this.map.locate({setView: true, maxZoom: 16});

      //Agora, quando você executar o aplicativo, verá que está sendo levado para o seu local no
      // ou melhor, o local onde seu dispositivo está no momento.

    /*this.map.locate({
      setView: true,
      maxZoom: 10

    }).on('locationfound', (e) => {
      console.log('Onde você se encontra agora com seu aparelho');

        //Agora, adicionamos um grupo de recursos, criamos um marcador e adicionamos o
        //marcador à camada de feição. Em seguida, adicionamos essa camada ao mapa.
        let group = Leaflet.featureGroup();
        let marker: any = Leaflet.marker([e.latitude, e.longitude]).on('click', () => {
          this.alert.create({
            title:"Atenção",
            message:"Marker clicked",
            buttons:[{
              text:"Aceitar",
              handler:()=>{}
            }]
          });
        });
      group.addLayer(marker);
      this.map.addLayer(group);
      }).on('locationerror', (err) => {
        this.alert.create({
          title: "Atenção",
          message: "Ocorreu erro: "+err,
          buttons: [{
            text: "Aceitar",
            handler: () => { }
          }]
        });
    });


    this.geolocation.getCurrentPosition({ enableHighAccuracy: false, maximumAge: Infinity, timeout: Infinity}).then((resp) => {
      console.log("Latitude: "+resp.coords.latitude);
      console.log("Longitude: " + resp.coords.longitude);
      console.log("Speed: " + resp.coords.speed);
      console.log("Heading: " + resp.coords.heading);
      console.log("Accuracy: " + resp.coords.accuracy);
      console.log("AltitudeAccuracy: " + resp.coords.altitudeAccuracy);
      console.log("TimeStamp: " + resp.timestamp);

    }).catch((error) => {
      console.log('Error ao buscar localização: ', error);
    });

    let watch = this.geolocation.watchPosition({enableHighAccuracy:false,maximumAge:Infinity,timeout:Infinity});
    console.log("Dados do Watch: "+watch);
    watch.subscribe((data) => {
      console.log("Dados que veio do Data: "+data.coords+"  "+data.timestamp);
    });
    */
  }

}
