import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DepartmentService {
    baseApiUrl: string = 'https://localhost:44391/api/Department';

    constructor(private http: HttpClient) {  }

  public async GetDepartmentDropdown() {
    const apiurl = `${this.baseApiUrl}/GetDropdown`;
    return this.http.get(apiurl);
  }
}