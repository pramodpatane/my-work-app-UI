import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UserService {
  baseApiUrl: string = 'https://localhost:44391/api/Users';

  constructor(private http: HttpClient) {

  }

  GetUserData(data: any) {
    const apiurl = `${this.baseApiUrl}/GetUsers`;
    return this.http.post(apiurl, data);
  }
}