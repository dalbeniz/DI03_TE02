import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RespuestaNoticias, Article } from './../../interfaces/interfaces';
import { GestionStorageService } from 'src/app/services/gestion-storage.service';
import { GestionRestService } from 'src/app/services/gestion-rest.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //Declaramos y creamos el array de noticias vacío
  listaNoticias: Article[] = [];
  /*
   * Creamos un objeto {} Observable que estará vacío y será del tipo Observable<RespuestaNoticias>. En este caso estamos creando un objeto vacío no será null.
   *
   * Otra manera de hacer esto sería utilizar | null = null, de esta manera decimos que el objeto respuestaNoticiasObservable de tipo Observable<RespuestaNoticias>
   * puede ser null y lo inicializamos null.
   * 
   * Crearlo como global puede ser útil si utilizamos el observable en varios métodos.
  */
  //respuestaNoticiasObservable: Observable<RespuestaNoticias> = {} as Observable<RespuestaNoticias>;
  //respuestaNoticiasObservable: Observable<RespuestaNoticias> | null = null;

  //Añadimos el servicio rest y el de guardar las noticiaschequeadas
  constructor(public gestionNoticiasLeerService: GestionNoticiasLeerService, private gestionRest: GestionRestService ) {
    this.cargarArticulosCategoria("business");
  }

  // Comprueba si la noticia seleccionada (checked) está para leer o no
  seleccionado(item: Article): boolean {
    let indice: number = this.gestionNoticiasLeerService.buscarNoticia(item);
    if (indice != -1) {
      return true;
    }
    return false; 
  }

  // Cuando cambia el check, en función de su valor añade o borra la noticia del array
  checkNoticia(eventoRecibido: any, item: Article) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionNoticiasLeerService.addNoticias(item);
    } else {
      this.gestionNoticiasLeerService.borrarNoticia(item);
    }    
  }

  //Al cambiar la categoria llama a cargarArticulosCategoria para cambiar la lista noticias que se muestran
  cambiarCategoria(categoria:any){
    this.cargarArticulosCategoria(categoria.detail.value);
  }

  //Dada una categoria llama al servicio rest y carga los datos en la lista de noticias 
  cargarArticulosCategoria(categoria: string){
    console.log("Categoria"+categoria);
    let respNoticias : Observable<RespuestaNoticias> = this.gestionRest.consultaCategoriaGet(categoria);
    this.listaNoticias = [];
    respNoticias.subscribe(datos =>{
      if(datos.status == "ok")
        this.listaNoticias.push(... datos.articles);
    });
  }
}
