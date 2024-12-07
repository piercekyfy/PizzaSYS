import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MenuCategory } from "./menu-body/menu-body.component";
import { Observable, takeUntil } from "rxjs";

const API_URL = window.location.origin + '/api/menu' 

@Injectable({ providedIn: "root" }) 
export class MenuDataService {
    constructor(private http: HttpClient) {}
    public getMenu(): Observable<MenuCategory[]> {
        return this.http.get<MenuCategory[]>(API_URL);
    }
    
}