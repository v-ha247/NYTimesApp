import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Doc } from 'src/app/models/search.model';

@Component({
  selector: 'app-searchdetails',
  templateUrl: './searchdetails.page.html',
  styleUrls: ['./searchdetails.page.scss'],
})
export class SearchdetailsPage implements OnInit {

  doc: Doc;

  constructor(
    private modalController: ModalController
  ) { 

  }

  ngOnInit() {
    console.log(this.doc)
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
