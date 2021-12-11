import { Component } from '@angular/core';
import { NYTimesAPIService } from '../services/api/nytimes-api.service';

import { ModalController } from '@ionic/angular';
import { SearchparametersPage } from '../modals/searchparameters/searchparameters.page'
import { SearchdetailsPage } from '../modals/searchdetails/searchdetails.page';

import { Doc } from '../models/search.model'

import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  //searchQuery: String = "";

  date: Date = new Date();
  endDate: string = new Date().toISOString();
  beginDate: string = new Date(
    this.date.getFullYear() - 1, this.date.getMonth(), this.date.getDay()
  ).toISOString();

  sort: string = "relevance";
  sortList: any[] = [
    { value: "relevance", name: "Relevance" },
    { value: "newest", name: "Newest" },
    { value: "oldest", name: "Oldest" }
  ];

  docs: Doc[] = [];
  showLoader: boolean;
  searchBar: string
  searchHistory: any[] = [];

  constructor(
    private nytimesService: NYTimesAPIService,
    private modalController: ModalController,
  ) {
    this.getHistory();
  }

  async openModalParam() {
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
        if (typeof (data.data) != "undefined") {
          this.sort = data.data.sort;
          this.endDate = data.data.endDate;
          this.beginDate = data.data.beginDate;
        }
      });
    return await modal.present();
  }

  async openModalDetail(item) {
    const modal = await this.modalController.create({
      component: SearchdetailsPage,
      cssClass: 'transparent-modal-css',
      componentProps: {
        doc: item
      }
    });

    return await modal.present();
  }

  search($event) {
    if ($event.target.value) {
      console.log($event.target.value);
      this.saveHistory($event.target.value);
      this.callAPI($event.target.value);
    }
  }

  searchFromHistory(history: string) {
    console.log(history);
    this.saveHistory(history);
    this.searchBar = history;
    this.callAPI(history);
  }

  callAPI(keyWord: string) {
    this.showLoader = true;
    // q=keyword&begin_date=20120101&end_date=20121231&sort=oldest 
    const query =
      "q=" + keyWord.replace(/\s/g, '+')
      + "&" + "begin_date=" + this.beginDate.substr(0, 4) + this.beginDate.substr(5, 2) + this.beginDate.substr(8, 2)
      + "&" + "end_date=" + this.endDate.substr(0, 4) + this.endDate.substr(5, 2) + this.endDate.substr(8, 2)
      + "&" + "sort=" + this.sort;
    console.log(query);

    this.nytimesService.getSearch(query).subscribe(data => {
      console.log(data);
      this.docs = data.response.docs;
      this.showLoader = false;
    });
  }

  async saveHistory(search: string) {
    let index = -1;
    for (const h in this.searchHistory) {
      if (this.searchHistory[h].toUpperCase() == search.toUpperCase()) {
        index = this.searchHistory.indexOf(this.searchHistory[h]);
      }
    }
    if (index > -1) {
      this.searchHistory.splice(index, 1);
    }
    this.searchHistory.unshift(search);
    if (this.searchHistory.length > 5) {
      this.searchHistory.pop();
    }

    console.log(this.searchHistory);
    await Storage.set({
      key: "history",
      value: JSON.stringify(this.searchHistory)
    })
  }

  async clearHistory() {
    await Storage.clear()
    this.searchHistory = [];
  }

  async getHistory() {
    const { value } = await Storage.get({ key: "history" })
    if (value) {
      this.searchHistory = JSON.parse(value);
      console.log(this.searchHistory)
    }
  }

  async deleteHistory(history: string) {
    const index = this.searchHistory.indexOf(history);
    if (index > -1) {
      this.searchHistory.splice(index, 1);
    }
    console.log(this.searchHistory);
    await Storage.set({
      key: "history",
      value: JSON.stringify(this.searchHistory)
    })
  }
}
