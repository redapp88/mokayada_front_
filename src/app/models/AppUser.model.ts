import {AppRole} from "./AppRole.model";


export class AppUser {
  constructor(public username:string,public firstName:string, public lastName:string, public sex:string, public phone:string,public email:string, public subscribeDate:string,public birthDate:string,
              public state:string,public role: AppRole) {
  }
}
