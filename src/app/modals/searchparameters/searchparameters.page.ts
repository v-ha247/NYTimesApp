import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-searchparameters',
  templateUrl: './searchparameters.page.html',
  styleUrls: ['./searchparameters.page.scss'],
})
export class SearchparametersPage implements OnInit {

  sort: string;
  endDate: string;
  beginDate: string;
  sortList: any[];

  constructor(
    private modalController: ModalController
  ) {

  }

  ngOnInit() {
    console.log(`Sort: ${this.sort}, End date: ${this.endDate}, 
    Begin date: ${this.beginDate}, Sort List: ${this.sortList}`)
  }

  async closeModal() {
    let data = { sort: this.sort, 
      endDate: this.endDate,
      beginDate: this.beginDate
    };
    await this.modalController.dismiss(data);
  }

}
