import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
  
})
export class DataService {
  
  protected httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders;
  }

  getData(): Observable<any>{
    console.log({headers: this.httpHeaders});
    
     return this.http.get<any>(
      'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&gsrnamespace=0&gsrlimit=5&search=%27kevin%20bakon%27&origin=*'
      // 'http://swapi.dev/api/people'
      ,{headers:this.httpHeaders});
  }
}
