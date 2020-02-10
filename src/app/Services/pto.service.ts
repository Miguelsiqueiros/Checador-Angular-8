import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Pto } from "../Models/pto";

@Injectable({
  providedIn: "root"
})
export class PtoService {
  constructor(private httpClient: HttpClient) {}

  Create(pto: Pto) {
    return this.httpClient.post(`${environment.apiUrl}users/pto`, pto);
  }
}
