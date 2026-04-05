import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmployeeModel } from "../Models/employee.model";

@Injectable({
  providedIn: "root"
})

export class EmployeeService {
  baseApiUrl: string = 'https://localhost:44391/api/Employee';

  constructor(private http: HttpClient) {  }

  public async GetAllData(data: any) {
    try {
      const apiurl = `${this.baseApiUrl}/GetEmployeesData`;
      return await this.http.post(apiurl, data);
    }
    catch(err) {
      throw err;
    }
  }

  public async GetById(id: string) {
    try {
      const apiurl = `${this.baseApiUrl}/` + id;
      return await this.http.get(apiurl);
    }
    catch(err) {
      throw err;
    }
  }

  public async InsertData(data: EmployeeModel) {
    try {
      const apiurl = `${this.baseApiUrl}`;
      return await this.http.post(apiurl, data);
    } catch (err) {
      throw err;
    }
  }

  public async UpdateData(data: any) {
    try {
      const apiurl = `${this.baseApiUrl}`;
      return await this.http.put(apiurl, data);
    } catch (err) {
      throw err;
    }
  }

  public async Delete(recordId: string) {
    try {
      const apiurl = `${this.baseApiUrl}/Delete/` + recordId;
      return await this.http.get(apiurl);
    } catch (err) {
      throw err;
    }
  }
}