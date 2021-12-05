import { Component } from '@angular/core';
import { NYTimesAPIService } from '../services/api/nytimes-api.service';

import { ModalController } from '@ionic/angular';
import { SearchparametersPage } from '../modals/searchparameters/searchparameters.page'


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  searchQuery: String = "";

  date: Date = new Date();
  endDate: String = new Date().toISOString();
  beginDate: String = new Date(
    this.date.getFullYear() - 1, this.date.getMonth(), this.date.getDay()
  ).toISOString();

  sort: String = "relevance";
  sortList: any[] = [
    {value: "relevance", name: "Relevance"},
    {value: "newest", name: "Newest"},
    {value: "oldest", name: "Oldest"}
  ];

  constructor(
    private nytimesService: NYTimesAPIService,
    private modalController: ModalController
  ) { 

  }

  async openModal(){
    const modal = await this.modalController.create({
      component: SearchparametersPage,
      componentProps: { 
        sort: this.sort,
        endDate: this.endDate,
        beginDate: this.beginDate,
        sortList: this.sortList
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        this.sort = data.data.sort;
        this.endDate = data.data.endDate;
        this.beginDate = data.data.beginDate;
    });
    return await modal.present();
  }

  search($event){
    console.log($event.target.value);
    console.log(this.searchQuery);
  }
}
