import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractService } from '../../services/interact.service';
import { CommonService } from '../../services/common.service';
import { AuthnService } from '../../services/authn.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  data:any = {};
  options:boolean = false;
  constructor(private authnService:AuthnService,private interactService:InteractService, private commonService:CommonService) { }

  ngOnInit() {
    this.data = this.interactService.getData();
    /*if(!this.data.validUser){
      this.router.navigateByUrl('signin');
      return;
    }*/
  }

  openInNewTab() {
    window.open("http://jpleoleo.webs.com/", "_blank");
  }

  showOptions(){
    this.options = !this.options;
  }

  signOut(){
    this.options = !this.options;
    this.authnService.signout();
    this.navigateTo('signoff');
    this.commonService.removeInLocalStorage();
  }

  navigateTo(page?: string) {
    if(page===null || page===undefined){
      this.data = this.interactService.getData();
      this.commonService.navigateTo(this.data.previousPage);
    }else{
      this.commonService.navigateTo(page);
    }
  }
}
