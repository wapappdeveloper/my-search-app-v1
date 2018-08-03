import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { InteractService } from './interact.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from '@firebase/util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommonService {

  constructor(private httpClient: HttpClient, private router: Router, private interactService: InteractService) { }

  emailValidate(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  navigateTo(page: string) {
    var previousPage: string = this.router.url;
    this.router.navigateByUrl(page);
    var currentPage: string = page;
    console.log('previousPage=', previousPage, 'currentPage=', currentPage);
    this.interactService.setData({ previousPage: previousPage, currentPage: currentPage });
  }

  searchData(url: string, success:Function, fail:Function) {
    this.getData(url).subscribe(res => {
      success.call(this, res);
    },err => {
      fail.call(this, err);
    });
  }

  getData(url){
    return this.httpClient.get(url);
  }

  removeInLocalStorage(){
    if(window.localStorage){
      localStorage.removeItem('loginSearchApp');
    }else{
      console.warn('local storage not supported');
    }
  }

  storeInLocalStorage(data:any){
    if(window.localStorage){
      if(data!==null){
        localStorage.setItem('loginSearchApp', JSON.stringify(data));
      }
    }else{
      console.warn('local storage not supported');
    }
  }

  retriveFromLocalStorage(){
    if(window.localStorage){
      return localStorage.getItem('loginSearchApp');
    }else{
      console.warn('local storage not supported');
      return null;
    }
  }

}
