import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserModel } from "../../auth/Models/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private _user = signal<UserModel | null>(null);
  user = this._user.asReadonly();

  setUser(user: UserModel): void {
    this._user.set(user);
  }

  clearUser(): void {
    this._user.set(null);
  }

  isLoggedIn(): boolean {
    return this._user() !== null;
  }
}