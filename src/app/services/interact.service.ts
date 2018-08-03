import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class InteractService {
  data: any = {
    username: "",
    password: "",
    email:"",
    validUser: false,
    previousPage:'',
    currentPage:'',
    navPages:[],
    userUID:''
  }
  

  constructor() { }

  getData() {
    return this.data;
  }

  setData(data: any) {
    console.log(data);
    for (var x in data) {
      this.data[x] = data[x];
    }
  }
  /**Communicate between componens */
  private dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable();
  changeData(data:any) {
    this.dataSource.next(data);
  }
  /**Communicate between componens */
}
