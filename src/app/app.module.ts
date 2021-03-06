import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// usar para o google maps api
import { Geolocation } from '@ionic-native/geolocation';
// sos e fosse usar pro nativo do ionic o google maps
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
// fim ionic google nativo


import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

// bibliotecas importantes de promise
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


// paginas criadas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { BusLinhaPage } from '../pages/bus-linha/bus-linha';
import { LeafletMapPage } from '../pages/leaflet-map/leaflet-map';
import { GoogleMapPage } from '../pages/google-map/google-map';
import { ModestMapsPage } from '../pages/modest-maps/modest-maps';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BusLinhaPage,
    LeafletMapPage,
    GoogleMapPage,
    ModestMapsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BusLinhaPage,
    LeafletMapPage,
    GoogleMapPage,
    ModestMapsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    Geolocation
  ]
})
export class AppModule {}
