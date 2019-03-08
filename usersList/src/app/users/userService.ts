import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class UserService {
  constructor(private http:HttpClient){}

  loadUsers():Observable<any>{
    return this.http.get("./assets/people.json")
  }

}
