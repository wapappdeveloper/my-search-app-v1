import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { InteractService } from './interact.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { CONFIG } from '../config';

@Injectable()

export class AuthnService {
  constructor(private intractService:InteractService) { }

  signin(obj:any):Observable<any>{
    let observable = new Observable(observer=>{
      var username = obj.email;
      var password = obj.pass;
      if(username === CONFIG.loginCredential.username && password === CONFIG.loginCredential.password){
        observer.next(true);
      }else{
        observer.next(false);
      }
    });
    return observable;
  }

  signout(){
    this.intractService.setData({username:'',email:'', validUser:false});
  }
}
