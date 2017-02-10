import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import $ from 'jquery';

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpService {
  githubApiEndpoint = 'https://api.github.com';

  constructor(public http: Http) {
    console.log('Hello HttpService Provider');

  }

  load() {
    return $.get('https://api.github.com/users');
  }
  // load(): Observable<any> {
  //   this.http.get('https://api.github.com/users').subscribe(data => {
  //     console.log(data)
  //   })
  // }

  getGithubUser(userLogin) {
    return $.get('https://api.github.com/users/'+ userLogin);
  }

}
