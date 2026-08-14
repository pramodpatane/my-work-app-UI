import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserModel } from "../../auth/Models/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

    user = signal<UserModel | null>(null);
  private userSubject = new BehaviorSubject<UserModel | null>(null);

  user$ = this.userSubject.asObservable();

  setUser(user: UserModel) {
    this.userSubject.next(user);
  }

  clearUser() {
    this.userSubject.next(null);
  }
}