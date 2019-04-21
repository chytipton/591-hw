import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  uri = 'http://localhost:4201';

  constructor(private http: HttpClient) { }

  getJoke() {
    return this.http.get(`${this.uri}`);
  }
  
}

