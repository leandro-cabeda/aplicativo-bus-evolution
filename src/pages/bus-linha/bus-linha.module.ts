import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusLinhaPage } from './bus-linha';

@NgModule({
  declarations: [
    BusLinhaPage,
  ],
  imports: [
    IonicPageModule.forChild(BusLinhaPage),
  ],
})
export class BusLinhaPageModule {}
