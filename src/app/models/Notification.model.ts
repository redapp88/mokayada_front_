import {AppUser} from "./AppUser.model";

export class Notification {
  constructor(public id:number,public message:string,public creationDate:Date,public owner:AppUser,public readed:boolean,public link:string){}

}
