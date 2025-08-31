import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDetails } from '../models/LocationDetails';
import { WeatherDetails } from '../models/WeatherDetails';
import { Temparature } from '../models/Temparature';
import { Todaydata } from '../models/Todaydata';
import { TodayHightight } from '../models/TodayHightight';
import { Weekdata } from '../models/Weekdata';
import { Observable } from 'rxjs';
import { EnvironmentalVariable } from '../enviroment/environmentvariable';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  cityName: string = 'mumbai';
  language: string = 'en-US';
  date: string = '20250717';
  units: string = 'm';
  locationdetails?: LocationDetails;
  weartherdetails?: WeatherDetails;
  tempraturedata: Temparature = new Temparature();
  todaydata: Todaydata[] = [];
  todayhighlight?: TodayHightight = new TodayHightight();
  weekdata: Weekdata[] = [];
  curentTime: Date = new Date();
celcius:boolean=true;
fahrenheit:boolean=false;
today:boolean=false;
week:boolean=true;
  constructor(private http: HttpClient) {
    this.getData();
  }

  getsummaryimage(summary: string): string {
    const basadd = 'assets/';
    const cloudysunny = 'cloudysunny.png';
    const cloudwind = 'cloud-and-wind.png';
    const heavyrain = 'heavy-rain.png';
    const cloudy = 'cloudy.png';

    if (String(summary).includes("partly Cloudy") || String(summary).includes("p Cloudy")) return basadd + cloudysunny;
    else if (String(summary).includes("partly Rain") || String(summary).includes("p Rain")) return basadd + heavyrain;
    else if (String(summary).toLowerCase().includes("wind")) return basadd + cloudwind;
    else if (String(summary).toLowerCase().includes("cloudy")) return basadd + cloudy;
    else if (String(summary).includes("Sun")) return basadd + cloudysunny;
    return basadd + cloudysunny;
  }

  preparedata(): void {
    this.filltemparaturedatamodel();
    console.log("hii");
    this.filldata();
    this.todaydatavalue();
    this.filltodayhightlight();
    console.log(this.tempraturedata, "temppdata");
    console.log(this.weekdata, "filldata");
    console.log(this.todaydata, "todaydatavalue");
    console.log(this.todayhighlight, "filltodayhightlight");
    
  }
celciustoFahrenheit(celsius: number):number {
 return (celsius * 9/5) + 32;
}
  fahrenheittoCelcius(fahrenheit: number):number {
    return (fahrenheit - 32) * 5/9;
  } 

  
  filldata() {
    this.weekdata = [];
    if (!this.weartherdetails || !this.weartherdetails['v3-wx-forecast-daily-15day']) return;
    const daily = this.weartherdetails['v3-wx-forecast-daily-15day'];
    const days = Math.min(7, daily.dayOfWeek?.length || 0);
    for (let weekcount = 0; weekcount < days; weekcount++) {
      const week = new Weekdata();
      week.day = daily.dayOfWeek[weekcount]?.slice(0, 3) || '';
      week.maxtemp = daily.calendarDayTemperatureMax[weekcount];
      week.mintemp = daily.calendarDayTemperatureMin[weekcount];
      week.summaryimage = this.getsummaryimage(daily.narrative[weekcount]);
      this.weekdata.push(week);
    }
  }

  filltemparaturedatamodel(): void {
    if (
      !this.weartherdetails ||
      !this.weartherdetails['v3-wx-observations-current'] ||
      !this.locationdetails ||
      !this.locationdetails.location
    ) {
      console.error('Weather or location details not loaded');
      return;
    }

    const obs = this.weartherdetails['v3-wx-observations-current'];
    this.curentTime = new Date();
    this.tempraturedata.day = obs.dayOfWeek;
    this.tempraturedata.time = `${String(this.curentTime.getHours()).padStart(2, '0')}:${String(this.curentTime.getMinutes()).padStart(2, '0')}`;
    this.tempraturedata.temp = obs.temperature;
    this.tempraturedata.location = `${this.locationdetails.location.city[0]},${Array.isArray(this.locationdetails.location.country) ? this.locationdetails.location.country[0] : this.locationdetails.location.country}`;
    this.tempraturedata.rainper = obs.precip24Hour;
    this.tempraturedata.summaryphase = obs.wxPhraseShort;
    this.tempraturedata.summaryimage = this.getsummaryimage(this.tempraturedata.summaryphase);
  }

  todaydatavalue() {
    this.todaydata = [];
    if (!this.weartherdetails || !this.weartherdetails['v3-wx-forecast-hourly-10day']) return;
    const hourly = this.weartherdetails['v3-wx-forecast-hourly-10day'];
    const hours = Math.min(7, hourly.validTimeLocal?.length || 0);
    for (let todaycount = 0; todaycount < hours; todaycount++) {
      const today = new Todaydata();
      today.time = hourly.validTimeLocal[todaycount]?.slice(11, 16) || '';
      today.temp = hourly.temperature[todaycount];
      today.summaryimage = this.getsummaryimage(hourly.wxPhraseShort[todaycount]);
      this.todaydata.push(today);
    }
  }
gettimefromstrng(localTime:string){
  return localTime.slice(12, 17);
}
  filltodayhightlight(){
this.todayhighlight.airquality=this.weartherdetails['v3-wx-globalAirQuality'].globalairquality.airQualityIndex;
this.todayhighlight.humadity=this.weartherdetails['v3-wx-observations-current'].precip24Hour;
this.todayhighlight.sunrise=this.gettimefromstrng(this.weartherdetails['v3-wx-observations-current'].sunriseTimeLocal);
this.todayhighlight.sunset=this.gettimefromstrng(this.weartherdetails['v3-wx-observations-current'].sunsetTimeLocal);
this.todayhighlight.uvindex=this.weartherdetails['v3-wx-observations-current'].uvIndex;
this.todayhighlight.visibility=this.weartherdetails['v3-wx-observations-current'].visibility;
this.todayhighlight.windstatus=this.weartherdetails['v3-wx-observations-current'].windSpeed;
  }
  getlocationdetails(cityName: string, language: string): Observable<LocationDetails> {
    return this.http.get<LocationDetails>(EnvironmentalVariable.weartherApiLocationBaseURL, {
      headers: new HttpHeaders()
        .set(EnvironmentalVariable.xrapidapikey, EnvironmentalVariable.xrapidapivalue)
        .set(EnvironmentalVariable.xrapidhostkey, EnvironmentalVariable.xrapidhostvalue),
      params: new HttpParams()
        .set('query', cityName)
        .set('language', language)
    });
  }

  getweatherreport(date: string, latitude: number, longitude: number, language: string, units: string): Observable<WeatherDetails> {
    return this.http.get<WeatherDetails>(EnvironmentalVariable.weartherApiForecastBaseURL, {
      headers: new HttpHeaders()
        .set(EnvironmentalVariable.xrapidapikey, EnvironmentalVariable.xrapidapivalue)
        .set(EnvironmentalVariable.xrapidhostkey, EnvironmentalVariable.xrapidhostvalue),
      params: new HttpParams()
        .set('date', date)
        .set('latitude', latitude)
        .set('longitude', longitude)
        .set('language', language)
        .set('units', units)
    });
  }

 getData() {
  console.log('getData called');
  let latitude = 0;
  let longitude = 0;

  this.getlocationdetails(this.cityName, this.language).subscribe({
    next: (response) => {
      console.log('Location details response:', response);
      this.locationdetails = response;
      latitude = this.locationdetails?.location.latitude[0];
      longitude = this.locationdetails?.location.longitude[0];

      this.getweatherreport(this.date, latitude, longitude, this.language, this.units).subscribe({
        next: (weatherResponse) => {
          console.log('Weather report response:', weatherResponse);
          this.weartherdetails = weatherResponse;
          this.preparedata();
        },
        error: (err) => {
          console.error('Failed to get weather report', err);
        }
      });
    },
    error: (err) => {
      console.error('Failed to get location details', err); // <--- This will show the real error
    }
  });
}
}