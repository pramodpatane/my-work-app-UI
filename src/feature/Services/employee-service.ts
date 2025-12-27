import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class EmployeeService {
  baseApiUrl: string = 'https://localhost:44391/api/Employee';

  constructor(private http: HttpClient) {  }

  public async GetAllData(data: any) {
    try {
      const apiurl = `${this.baseApiUrl}/GetEmployees`;
      return await this.http.post(apiurl, data);
    }
    catch(err) {
      throw err;
    }
  }

  public async GetById(id: number) {
    try {
      const apiurl = `${this.baseApiUrl}/GetEmployeeById/` + id;
      return await this.http.get(apiurl);
    }
    catch(err) {
      throw err;
    }
  }

  public async InsertData(data: any) {
    try {
      const apiurl = `${this.baseApiUrl}/Create`;
      return await this.http.post(apiurl, data);
    } catch (err) {
      throw err;
    }
  }

  public async UpdateData(data: any) {
    try {
      const apiurl = `${this.baseApiUrl}/Update`;
      return await this.http.post(apiurl, data);
    } catch (err) {
      throw err;
    }
  }
}