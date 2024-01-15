import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { GestionStorageService } from './gestion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  private leerNoticias : Article[] = [];

  constructor(private storage:GestionStorageService) { 
    //Busca si hay algun objeto que tenga la clase noticias y lo devuelve como promesa
    let data : Promise <Article[]> = this.storage.getObject("noticias");

    //Añade las noticias guardadas al array de noticias pàra leer
    data.then((datos) =>{
      if(datos)
        this.leerNoticias.push(...datos);
    }).catch(() => {});
  }

  // Devuelve todas las noticias para leer
  getNoticias() {
    return this.leerNoticias;
  }

  //Añade una nueva noticia al array para poder leer
  addNoticias(noticia : Article){
    let noticiaString = JSON.stringify(noticia);
    noticia = JSON.parse(noticiaString);

    this.leerNoticias.push(noticia);
    this.storage.setObject("noticias", this.leerNoticias);
  }

  /* Comprueba si una noticia ya está en el array.
   * Mediante find vamos recorriendo todo el array hasta encontrar un objeto noticia que coincida con el objeto item que viene desde tab1.page.ts -> seleccionado()
   */
  buscarNoticia(item: Article): number  {
    let articuloEncontrado: any = this.leerNoticias.find(
      function(noticia) { 
        return JSON.stringify(noticia) == JSON.stringify(item);
      }
    );
    let indice = this.leerNoticias.indexOf(articuloEncontrado);
    return indice;
  }

  // Borra una noticia del array
  borrarNoticia(item: Article) {
    let indice = this.buscarNoticia(item);
    if (indice != -1) {
      this.leerNoticias.splice(indice, 1);
      this.storage.setObject("noticias", this.leerNoticias);
    }
  }

}
