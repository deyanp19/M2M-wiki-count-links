import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
  
})
export class DataService {
  
  protected httpHeaders: HttpHeaders;
  protected httpHeadersParse: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders;
    this.httpHeadersParse = new HttpHeaders({
      'Referer':'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&titles=Kevin%20Bacon',
      // 'Content-Type':'text/plain'
    });
  }
    
  parseUrl(searchString:string){
    return encodeURI(searchString);
  }
  
  getData(searchTerm:string): Observable<any>{
    console.log({headers: this.httpHeaders});
    console.log('%c the search term encoded:',"color:orange;font-size:18px", this.parseUrl(searchTerm));
    console.log('%c the URI encoded:',"color:green;font-size:16px", this.parseUrl(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&gsrnamespace=0&gsrlimit=5&search=%27${this.parseUrl(searchTerm)}%27&origin=*`));

    
    
     return this.http.get<any>(
      `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&gsrnamespace=0&gsrlimit=5&search=%27${this.parseUrl(searchTerm)}%27&origin=*`
      // 'http://swapi.dev/api/people'
      ,{headers: this.httpHeaders });
  }

  getHtmlForScrubing(search_term:string) {
    return this.http.get(
      `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&&origin=*&rvprop=content&rvsection=0&titles=%27Kevin%20Bacon%27`,
      {headers: this.httpHeadersParse}
    )
  }
}
