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

  public te:Bairros[]=[];
  public ho:string[]=[];
  public bar:Bairros[];
  public bar2: Bairros[];
  public bar3: Bairros[];



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bus = navParams.get("bus");
    console.log("Valor que chegou no bus de linhas: "+this.bus);
    this.bar=this.bus.sabados.bairros;
    this.te=this.bus.sabados.bairros;
    this.bus.sabados.bairros.forEach(f=>{ this.ho.push(f.horarios.join(" "))});

    /*for (const b of this.bar) {

      for (const b2 of this.te) {

        if(b2.nome===b.nome)
        {
          this.ho.push(b.horarios.join(" "));
        }

      }
      
    }*/


    /*this.te=this.bar.filter(e=> {
      e.horarios.filter(f=>{
          this.ho.push(f);
      })
      return e;
    });*/
    
    
    console.log("Valor que chegou no bar de bairros: " + this.bar);
    this.bar2 = this.bus.dias.bairros;
    this.bar3= this.bus.domingos_feriados.bairros;
  
   
    

  }

 

}
