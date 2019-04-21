import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  uri = 'http://localhost:4201';

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get(`${this.uri}/profile`);
  }
  getProfileById(id) {
    return this.http.get(`${this.uri}/profile/${id}`);
 }
  addProfile(first_name, last_name, favorite_category) {
    const profile = {
      first_name: first_name,
      last_name: last_name,
      favorite_category: favorite_category
    }
    return this.http.post(`${this.uri}/profile/add`, profile);
}
  updateProfile(id, first_name, last_name, favorite_category) {
  const profile = {
    first_name: first_name,
    last_name: last_name,
    favorite_category: favorite_category
};
  return this.http.post(`${this.uri}/profile/update/${id}`, profile);
}

deleteProfile(id) {
  return this.http.get(`${this.uri}/profile/delete/${id}`);
}
}
