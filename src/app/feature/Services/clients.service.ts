import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClientsApiUrls } from "../API_Urls/clients.api.urls";
import { ClientsModel } from "../Models/clients.model";

@Injectable({
    providedIn: 'root'
})

export class ClientsService {
    baseUrl: string = 'https://localhost:44391/';
    apiUrl: ClientsApiUrls = new ClientsApiUrls();

    constructor(private http: HttpClient) { }

    public async GetAllData(data: any) {
        try {
            const apiurl = `${this.baseUrl}${this.apiUrl.GetAll}`;
            return await this.http.post(apiurl, data);
        }
        catch (err) {
            throw err;
        }
    }

    public async GetById(id: string) {
        try {
            const apiurl = `${this.baseUrl}${this.apiUrl.GetById}(${id})`;
            return await this.http.get(apiurl);
        }
        catch (err) {
            throw err;
        }
    }

    public async InsertData(data: ClientsModel) {
        try {
            const apiurl = `${this.baseUrl}${this.apiUrl.Insert}`;
            return await this.http.post(apiurl, data);
        } catch (err) {
            throw err;
        }
    }

    public async UpdateData(data: any) {
        try {
            const apiurl = `${this.baseUrl}${this.apiUrl.Update}`;
            return await this.http.put(apiurl, data);
        } catch (err) {
            throw err;
        }
    }

    public async Delete(recordId: string) {
        try {
            const apiurl = `${this.baseUrl}${this.apiUrl.Delete}(${recordId})`;
            return await this.http.delete(apiurl);
        } catch (err) {
            throw err;
        }
    }
}