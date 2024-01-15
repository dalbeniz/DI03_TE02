import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaNoticias } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionRestService {
  private url : string = "https://newsapi.org/v2/top-headlines?";
  private apiKey : string = "ef31469aad98424b9b27635e316f818e";
  constructor(private http:HttpClient) { }

  //Realiza una consulta rest a newsapi y devuelve el resultado
  consultaCategoriaGet(categoria:string): Observable<RespuestaNoticias>{
    let datos:string = "country=us&category=" + categoria + "&apiKey=" + this.apiKey;
    return   this.http.get<RespuestaNoticias>(this.url + datos);
  }
}
