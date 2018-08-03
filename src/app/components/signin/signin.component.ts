import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthnService } from '../../services/authn.service';
import { InteractService } from '../../services/interact.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  data:any = {};
  password:string = '';
  constructor(private commonService:CommonService, private authnService: AuthnService, private interactService: InteractService) { }

  ngOnInit() {
    this.data = this.interactService.getData();
    if(this.data.validUser===true){
      this.commonService.navigateTo('search');
      return;
    }
    var dataFromLocalSorage:any = this.commonService.retriveFromLocalStorage();
    //console.log(dataFromLocalSorage);
    if(dataFromLocalSorage!==null && dataFromLocalSorage!==undefined){
      this.data = this.interactService.data = JSON.parse(dataFromLocalSorage);
      this.signIn(false, this.data.password);
    }else{
      //console.log('sign in page');
    }
  }

  submit() {
    if ((this.data.email).trim() == '' || (this.password).trim() == '') {
      alert('some fields are empty');
      return;
    }
    this.signIn(true, this.password);
  }
  signIn(allowAlert:boolean, pass:string){
    this.authnService.signin({email:this.data.email, pass:pass}).subscribe((res) => {
      if (res) {
        this.data.validUser = true;
        this.data.password = pass;
        this.data.username = this.data.email;
        this.interactService.data = this.data;
        this.password = '';
        this.commonService.storeInLocalStorage(this.data);
        this.interactService.changeData({id:'signin', data:true});
      } else {
        this.password = '';
        this.data.email = '';
        this.data.name = '';
        this.interactService.data = this.data;
        (allowAlert)?console.error('username and password does not match'):'';
        (allowAlert)?alert('username and password does not match'):'';
      }
    },(err)=>{
      //console.error(err, err.code);
      if(err.code === 'auth/user-not-found'){
        console.error(err.message);
        alert(err.message);
      }else if(err.code === 'auth/wrong-password'){
        console.error(err.message);
        alert(err.message);
        this.password = '';
      }else{
        console.error(err);
      }
    });
  }

  navigateTo(page: string) {
    this.commonService.navigateTo(page);
  }
}
