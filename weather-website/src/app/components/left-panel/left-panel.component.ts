import { Component } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent {
 constructor(public wearther:WeatherService){

 }

 onsearch(location:string){
this.wearther.cityName=location;
this.wearther.getData();
 }
}