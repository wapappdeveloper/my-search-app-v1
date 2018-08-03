import { Component, ViewChild, ElementRef } from '@angular/core';
import { InteractService } from './services/interact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'app';
  data:any = {};
  constructor(private interactService:InteractService, private router:Router){}

  ngOnInit(){
    this.data = this.interactService.getData();
    this.interactService.currentData.subscribe((res)=>{
      if(res!==null && res!==undefined){
        (res.id==='signin' && res.data===true)?this.emitter({res:res.data}):'';
      }else{
        console.warn('currentData is =>', res);
      }
    });
    this.router.navigateByUrl('signin');
  }
  emitter(obj:any){
    if(obj.res){
      this.router.navigateByUrl('search');
    }else{
      console.error('invalid result =', obj);
    }
  }
}
