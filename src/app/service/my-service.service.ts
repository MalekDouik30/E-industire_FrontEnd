import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http:HttpClient) { }


  logOut(){
    return this.http.get("http://localhost:8080/app/logout")
  }

}
