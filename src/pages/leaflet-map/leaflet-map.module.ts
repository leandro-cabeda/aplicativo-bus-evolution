import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeafletMapPage } from './leaflet-map';

@NgModule({
  declarations: [
    LeafletMapPage,
  ],
  imports: [
    IonicPageModule.forChild(LeafletMapPage),
  ],
})
export class LeafletMapPageModule {}
