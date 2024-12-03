import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MenuCategory } from "./menu-body/menu-body.component";
import { Observable, takeUntil } from "rxjs";

const API_URL = window.location.origin + '/api' 

@Injectable({ providedIn: "root" }) 
export class MenuDataService {
    constructor(private http: HttpClient) {}
    public getMenu(): Observable<any> {
        //API_URL + '/menu'
        return this.http.get<any>("http://localhost:3000/api/menu");
    }
    
}