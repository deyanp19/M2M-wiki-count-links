import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
  
})
export class DataService {

  constructor(private http: HttpClient) {}

  getData(): Observable<any>{
     return this.http.get<any>('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&gsrnamespace=0&gsrlimit=5&search=%27kevin%20bakon%27');
  }
}
