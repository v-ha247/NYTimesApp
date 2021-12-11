import { Component, ViewChild } from '@angular/core';
import { NYTimesAPIService } from '../services/api/nytimes-api.service';

import { Result } from 'src/app/models/mostpopular.model';
import { IonContent } from '@ionic/angular';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonContent) content: IonContent;

  results$: Observable<Result>;

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

  constructor(
    private nytimesService: NYTimesAPIService,
  ) {
    this.callAPI$();
  }

  onChange($event){
    console.log($event.target.value);
    this.callAPI$();
  }

  callAPI$(){
    this.results$ = this.nytimesService.getMostPopular$(this.selectedBasedOn,this.selectedPeriod);
  }

  scrollToTop() {
    this.content.scrollToTop(400);
  }

}
