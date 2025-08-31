import { Component } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent {
  constructor(public wearther:WeatherService){}
 days = [
    { name: 'Sun', temp: '15° - 21°' },
    { name: 'Mon', temp: '12° - 19°' },
    { name: 'Tue', temp: '9° - 17°' },
    { name: 'Wed', temp: '8° - 17°' },
    { name: 'Thu', temp: '6° - 15°' },
    { name: 'Fri', temp: '4° - 14°' },
    { name: 'Sat', temp: '3° - 13°' },
  ];

  isactive:boolean=false
onclickActive(){
  this.isactive=true
}


ontodayclick(){
this.wearther.today=true;
this.wearther.week=false;
}
onclickweek(){
  this.wearther.today=false;
this.wearther.week=true;
}

onclickcelsius(){
  this.wearther.celcius=true;
this.wearther.fahrenheit=false;
}
onclickfah(){
    this.wearther.celcius=false;
this.wearther.fahrenheit=true;
}
}
