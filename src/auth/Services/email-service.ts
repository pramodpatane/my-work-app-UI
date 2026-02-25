import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmailModel, VerifyOtpModel } from "../Models/email.model";

@Injectable({
    providedIn: "root"
})

export class EmailService {
    private baseApiUrl = 'https://localhost:44391/api'

    constructor(private http: HttpClient) {

    }

    public async GetEmailConfiguration(FormCode: string) {
        const apiurl = `${this.baseApiUrl}/Email/GetEmailConfiguration/` + FormCode;
        return this.http.get(apiurl);
    }

    public async SendOTP(emailModel: EmailModel) {
        const apiurl = `${this.baseApiUrl}/OTP/SendOTP`;
        return this.http.post(apiurl, emailModel);
    }

    public async VerifyOTP(otpmodel: VerifyOtpModel) {
        const apiurl = `${this.baseApiUrl}/OTP/VerifyOTP`;
        return this.http.post(apiurl, otpmodel);
    }
}