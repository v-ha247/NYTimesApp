import { Component, ViewChild } from '@angular/core';
import { NYTimesAPIService } from '../services/api/nytimes-api.service';

import { TopStories } from 'src/app/models/topstories.model';
import { Result } from 'src/app/models/topstories.model';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonContent) content: IonContent;
  
  //topstories: TopStories;
  results: Result[] = [];

  sections: any[] = [
    {value: "arts", name: "Arts"},
    {value: "automobiles", name: "Automobiles"},
    {value: "books", name: "Books"},
    {value: "business", name: "Business"},
    {value: "fashion", name: "Fashion"},
    {value: "food", name: "Food"},
    {value: "health", name: "Health"},
    {value: "home", name: "Home"},
    {value: "movies", name: "Movies"},
    {value: "magazine", name: "Magazine"},
    {value: "nyregion", name: "NY Region"},
    {value: "obituaries", name: "Obituaries"},
    {value: "opinion", name: "Opinion"},
    {value: "politics", name: "Politics"},
    {value: "realestate", name: "Realestate"},   
    {value: "science", name: "Science"},   
    {value: "sports", name: "Sports"},   
    {value: "sundayreview", name: "Sunday Review"},   
    {value: "technology", name: "Technology"},   
    {value: "theater", name: "Theater"},   
    {value: "t-magazine", name: "t-magazine"},   
    {value: "travel", name: "Travel"},   
    {value: "upshot", name: "Upshot"},   
    {value: "us", name: "U.S."},
    {value: "world", name: "World"}      
  ];
  selectedSection: any = "home";

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
    this.nytimesService.getTopStories(this.selectedSection).subscribe(data=>{
      console.log(data);
      //this.topstories = data;
      this.results = data.results;
      this.showLoader = false;
    });
  }

  scrollToTop() {
    this.content.scrollToTop(400);
  }

}
