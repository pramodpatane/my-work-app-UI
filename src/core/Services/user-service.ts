import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "../../auth/Models/user-model";

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

  Insert(userModel: UserModel) {
    const apiurl = `${this.baseApiUrl}/Create`;
    return this.http.post(apiurl, userModel);
  }

  GetById(recordId: string) {
    const apiurl = `${this.baseApiUrl}/GetById/` + recordId;
    return this.http.get(apiurl);
  }
}