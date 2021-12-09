import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MostPopular } from 'src/app/models/mostpopular.model';
import { Search } from 'src/app/models/search.model';
import { TopStories } from 'src/app/models/topstories.model';


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

  public getTopStories(section: String) {
    return this.http.get<TopStories>(this.apibase + '/svc/topstories/v2/'
      + section + '.json?api-key=' + this.key);
  }

  public getSearch(query: String) {
    return this.http.get<Search>(this.apibase + '/svc/search/v2/articlesearch.json?'
      + query + '&api-key=' + this.key);
  }
}
