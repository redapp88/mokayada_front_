import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environement/environement";
import {AuthService} from "./auth.service";
import {AppPhoto} from "../models/AppPhoto.model";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  addPhotos(itemId: number, photos: AppPhoto[]) {
    return  this.http.post
    (`${environment.backEndUrl}/photos/add`,{itemId:itemId,photos:photos},this.authService.httpOptions())
  }
  /*
   public editFolder(id: number, name: string, description: string,typeId:Category) {
     return  this.http.put
     (`${environment.backEndUrl}/folders/${id}`,{name:name,description:description,type: {id:typeId}},this.authService.httpOptions())
   }

   deleteFolder(id: number) {
     return  this.http.delete
     (`${environment.backEndUrl}/folders/${id}`,this.authService.httpOptions())
   }*/
  /*delete(ids: string[]) {
    return  this.http.post
    (`${environment.backEndUrl}/documents/delete`,ids,this.authService.httpOptions())
  }*/
  updatehotos(id: any, deletedPhotos: AppPhoto[], photos: AppPhoto[]) {
console.log(deletedPhotos)
    return  this.http.put
    (`${environment.backEndUrl}/photos/update/${id}`,{itemId:id,deletedPhotos,photos:photos},this.authService.httpOptions())

  }
}

