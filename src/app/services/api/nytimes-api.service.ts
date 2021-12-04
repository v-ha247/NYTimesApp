import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MostPopular } from 'src/app/models/mostpopular.model';

@Injectable({
  providedIn: 'root'
})
export class NYTimesAPIService {

  constructor(private http: HttpClient) { }

  apibase = 'https://api.nytimes.com'
  key = 'oUlP1el2J6VGn2dAkGXtUeanZWZ0Go64'

  public getMostPopular(basedOn: String, days: String) {
    return this.http.get<MostPopular>(this.apibase + '/svc/mostpopular/v2/'
      + basedOn + '/' + days + '.json?api-key=' + this.key);
  }
}
