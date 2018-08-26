import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Onibus } from '../../models/Onibus';

@IonicPage()
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage implements OnInit{
  public bus:Onibus;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bus = this.navParams.get("bus");
  }

  ngOnInit(): void {
    this.carregarMapa();
  }

  ionViewDidLoad() {
    //this.carregarMapa();
  }

  public carregarMapa()
  {

  }

}
