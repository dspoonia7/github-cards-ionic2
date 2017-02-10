import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

import { HttpService } from '../../providers/http-service';

@Component({
  selector: 'modal-select-user',
  templateUrl: 'modal-select-user.html'
})
export class ModalSelectUserComponent {
  @Input('userCards') userCards;

  users: any = [];
  selectedUsers: any = [];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public httpService: HttpService
  ) { }

  ionViewDidLoad() {
    this.httpService.load().then((data) => {
      this.users = data;
    })
  }

  ngViewAfterInit() {

  }

  fetchUsersData(searchText) {
   // if the value is an empty string don't filter the users
    if (searchText && searchText.trim() != '') {
      this.users = this.users.filter((user) => {
        return (user.login.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
      })
    }
  }

  getFilteredUsers(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;

    // Reset users back to all of the users
    this.fetchUsersData(val);
  }

  itemSelected(selectedUser: any) {
    this.selectedUsers.push(selectedUser);
    this.users = this.users.filter((user) => {
      return user.login !== selectedUser.login;
    })
  }

  dismiss() {
    let returnData = {};
    this.viewCtrl.dismiss(this.selectedUsers);
  }
}
