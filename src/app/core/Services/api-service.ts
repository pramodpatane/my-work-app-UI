import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserStateService } from "./user.state.service";

@Injectable({
    providedIn: "root"
})

export class ApiService {
    constructor(private http: HttpClient, private userSessionService: UserStateService) {

    }

    // processApiRequest(url, method, data, async = false, tokenRequired = false) {
    //     const language = this.userSessionService.getSessionUserLanguage();
    //     // Replace language and api Url
    //     const requestUrl = ApiBaseUrls.getUrl(language, url, async);
    //     const requestHeaders = this.addHeadersToApiRequest(tokenRequired);
    //     let apiResponse;
    //     try {
    //         if (method === enumApiRequestMethod.GetMethod) {
    //             apiResponse = this.http.get(requestUrl, { headers: requestHeaders });
    //         }
    //         else if (method === enumApiRequestMethod.DeleteMethod) {
    //             apiResponse = this.http.delete(requestUrl, { headers: requestHeaders });
    //         }
    //         else if (method === enumApiRequestMethod.PutMethod) {
    //             apiResponse = this.http.put(requestUrl, data, { headers: requestHeaders });
    //         }
    //         else if (method === enumApiRequestMethod.PostMethod) {
    //             apiResponse = this.http.post(requestUrl, data, { headers: requestHeaders });
    //         }
    //         else if (method === enumApiRequestMethod.File) {
    //             apiResponse = this.http.post(requestUrl, data, { responseType: 'text' });
    //         }
    //     }
    //     catch (error) {
    //         throw error;
    //     }
    //     return apiResponse;
    // }

    addHeadersToApiRequest(tokenRequired: boolean) {
        const user = this.userSessionService.user();
        let token = "";
        if (user) {
            token = user.token || 'token';
        }
        if (tokenRequired === true && token != "") {
            return new HttpHeaders({
                //'Content-Type': 'application/json',  This is removed for upload document functionality
                'Authorization': 'Bearer ' + token
            });
        }
        else {
            return null;
        }
    }
}