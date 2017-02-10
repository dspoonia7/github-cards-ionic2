import { Component } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import _ from 'lodash';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

import { NavController } from 'ionic-angular';

import { HttpService } from '../../providers/http-service';
import { ModalSelectUserComponent } from '../../components/modal-select-user/modal-select-user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  onChangeSearch: Function;
  fetchUsers: Function;
  userCards: any = [];
  sortBy: string = 'name';

  constructor(
    public navCtrl: NavController,
    public http: Http,
    public modalCtrl: ModalController,
    public httpService: HttpService
  ) { }

  openModal() {
    let params = {
      userCards: this.userCards
    }
    let modal = this.modalCtrl.create(ModalSelectUserComponent, params);
    modal.onDidDismiss((data) => {
      let cards = [...this.userCards, ...data];
      let cardsList = []
      _.forEach(cards, (card, index) => {
        this.httpService.getGithubUser(card.login).then((user) => {
          cardsList.push(user);
          if (index === cards.length -1) {
            this.userCards = this.getSortedList(cardsList);
          }
        });
      });
    })
    modal.present();
  }

  removeCard(event, card) {
    event.stopPropagation();
    this.userCards = this.userCards.filter((user) => {
      return user.login.toLowerCase() !== card.login.toLowerCase();
    })
  }

  getSortedList(list) {
    return _.sortBy(list, this.sortBy);
  }

  soryCardsBy() {
    this.userCards = this.getSortedList(this.userCards);
  }

  ionViewDidLoad() {

  }

}
