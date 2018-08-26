import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Onibus } from '../../models/Onibus';
import { Bairros } from '../../models/Bairros';
import { Sabados } from '../../models/Sabados';
import { Domingos_feriados } from '../../models/Domingos_Feriados';
import { Dias } from '../../models/Dias';
import { bind2 } from '@angular/core/src/render3/instructions';

@IonicPage()
@Component({
  selector: 'page-bus-linha',
  templateUrl: 'bus-linha.html',
})
export class BusLinhaPage {
  public bus: Onibus;
  public bus2:Bairros[];
  public bus3: Bairros[];
  public bus4: Bairros[];



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bus = this.navParams.get("bus");
    console.log("Valor que chegou no bus de linhas: "+this.bus);
    this.bus2=this.bus.sabados.bairros;
    this.bus3 = this.bus.dias.bairros;
    this.bus4 = this.bus.domingos_feriados.bairros;



  }



}
