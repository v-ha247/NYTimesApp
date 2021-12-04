import { Component } from '@angular/core';
import { NYTimesAPIService } from '../services/api/nytimes-api.service';

import { MostPopular } from 'src/app/models/mostpopular.model';
import { Result } from 'src/app/models/mostpopular.model';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  mostpopular: MostPopular;
  results: Result[] = [];

  basedOn: any[] = [];
  period: any[] = [];
  selectedBasedOn: any = "viewed";
  selectedPeriod: any = "1";

  constructor(
    private nytimesService: NYTimesAPIService,
    private platform: Platform
  ) {
    this.nytimesService.getMostPopular(this.selectedBasedOn,this.selectedPeriod).subscribe(data=>{
      console.log(data);
      this.mostpopular = data;
      this.results = data.results;
    });

    this.platform.ready().then(()=>{
      this.basedOn = [
        {value: "viewed", name: "Views"},
        {value: "shared", name: "Shared"},
        {value: "emailed", name: "Emailed"}
      ];
      this.period = [
        {value: "1", name: "Today"},
        {value: "7", name: "Last 7 days"},
        {value: "30", name: "Last 30 days"}
      ];
    })
  }

  onChange($event){
    console.log($event.target.value);
    this.nytimesService.getMostPopular(this.selectedBasedOn,this.selectedPeriod).subscribe(data=>{
      console.log(data);
      this.mostpopular = data;
      this.results = data.results;
    });
  }
}
