import { Component, ViewChild } from '@angular/core';
import { NYTimesAPIService } from '../services/api/nytimes-api.service';

import { MostPopular } from 'src/app/models/mostpopular.model';
import { Result } from 'src/app/models/mostpopular.model';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonContent) content: IonContent;
  
  //mostpopular: MostPopular;
  results: Result[] = [];

  basedOn: any[] = [
    {value: "viewed", name: "Views"},
    {value: "shared", name: "Shared"},
    {value: "emailed", name: "Emailed"}
  ];
  period: any[] = [
    {value: "1", name: "Today"},
    {value: "7", name: "Last 7 days"},
    {value: "30", name: "Last 30 days"}
  ];
  selectedBasedOn: any = "viewed";
  selectedPeriod: any = "1";

  showLoader: boolean;

  constructor(
    private nytimesService: NYTimesAPIService,
  ) {
    this.callAPI();
  }

  onChange($event){
    console.log($event.target.value);
    this.callAPI();
  }

  callAPI(){
    this.showLoader = true;
    this.nytimesService.getMostPopular(this.selectedBasedOn,this.selectedPeriod).subscribe(data=>{
      console.log(data);
      //this.mostpopular = data;
      this.results = data.results;
      this.showLoader = false;
    });
  }

  scrollToTop() {
    this.content.scrollToTop(400);
  }

}
