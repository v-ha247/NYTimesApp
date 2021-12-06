import { Component } from '@angular/core';
import { NYTimesAPIService } from '../services/api/nytimes-api.service';

import { ModalController } from '@ionic/angular';
import { SearchparametersPage } from '../modals/searchparameters/searchparameters.page'

import { Doc } from '../models/search.model'


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

//searchQuery: String = "";

  date: Date = new Date();
  endDate: String = new Date().toISOString();
  beginDate: String = new Date(
    this.date.getFullYear() - 1, this.date.getMonth(), this.date.getDay()
  ).toISOString();

  sort: String = "relevance";
  sortList: any[] = [
    { value: "relevance", name: "Relevance" },
    { value: "newest", name: "Newest" },
    { value: "oldest", name: "Oldest" }
  ];

  query: String;
  docs: Doc[] = [];

  showLoader: boolean;

  constructor(
    private nytimesService: NYTimesAPIService,
    private modalController: ModalController
  ) {

  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SearchparametersPage,
      cssClass: 'custom-modal-css',
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
        if (typeof(data.data) != "undefined"){
          this.sort = data.data.sort;
          this.endDate = data.data.endDate;
          this.beginDate = data.data.beginDate;
        }
      });
    return await modal.present();
  }

  search($event) {
    this.showLoader = true;
    console.log($event.target.value);

    // q=keyword&begin_date=20120101&end_date=20121231&sort=oldest
    this.query =
      "q=" + $event.target.value.replace(/\s/g, '+')
      + "&" + "begin_date=" + this.beginDate.substr(0, 4) + this.beginDate.substr(5, 2) + this.beginDate.substr(8, 2)
      + "&" + "end_date=" + this.endDate.substr(0, 4) + this.endDate.substr(5, 2) + this.endDate.substr(8, 2)
      + "&" + "sort=" + this.sort
    console.log(this.query);

    this.nytimesService.getSearch(this.query).subscribe(data => {
      console.log(data);
      this.docs = data.response.docs;
      this.showLoader = false;
    });
  }
}
