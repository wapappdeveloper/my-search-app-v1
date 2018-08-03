import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractService } from '../../services/interact.service';
import { CommonService } from '../../services/common.service';
import { AuthnService } from '../../services/authn.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  prefixUrl: string = 'https://swapi.co/api/planets/?search=';
  data: any = {};
  searchWord: string = '';
  loading: boolean = false;
  selectedPlanet: any = null;
  planetSearchList: any = [];
  options: boolean = false;
  timer: any;
  showHide:boolean = false;

  searchDelay:number = 200;
  searchTimer: any;
  searchEnabled: boolean = true;
  searchCount: number = 0;
  searchCountPerMinute: number = 15;
  searchCountResetMinute: number = 1;

  constructor(private authnService: AuthnService, private commonService: CommonService, private router: Router, private interactService: InteractService) { }

  ngOnInit() {
    this.data = this.interactService.getData();
    //console.log(this.data.username);
    if (!this.data.validUser) {
      this.router.navigateByUrl('signin');
      return;
    }
    this.startCountDown();
  }

  startCountDown() {
    this.searchTimer = setInterval(() => {
      this.searchEnabled = true;
      this.searchCount = 0;
    }, 10000 * this.searchCountResetMinute);
  }

  search() {
    //console.log('search');
    if(this.searchWord===''){
      alert('Enter some text to Search');
      return;
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.startSearch(this.searchWord);
    }, this.searchDelay);
  }

  keyDown(event:any){
    clearTimeout(this.timer);
  }

  keyUp(event:any) {
    //console.log('keyUp');
    var searchWord = event.target.value;
    //console.log(searchWord);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.startSearch(searchWord);
    }, 300);
    this.options = false;
  }
  startSearch(text: string) {
    if (!this.searchEnabled) {
      alert('you are allowed only ' + this.searchCountPerMinute + ' search in a minute. please wait for some time, then search');
      return;
    }
    if (text === '') {
      this.planetSearchList = [];
      return;
    }
    this.loading = true;
    var combineSearchUrl: string = this.prefixUrl + text;
    this.commonService.searchData(combineSearchUrl, (res) => {
      this.dataSearchSuccess(res);
    }, (err) => {
      this.dataSearchFailed(err);
    });
  }

  dataSearchSuccess(res) {
    //console.log(res);
    this.planetSearchList = res.results;
    this.loading = false;
    //console.log(this.planetSearchList);
    if(this.planetSearchList.length===0){
      this.showHide = true;
      setTimeout(() => {
        this.showHide = false;
      }, 2000);
    }
  }

  dataSearchFailed(err) {
    //console.log(err);
  }

  showDetailOfSelectedPlanet(data: any) {
    //console.log(data);
    this.searchCount++;
    if (this.searchCount >= this.searchCountPerMinute) {
      this.searchEnabled = false;
    }
    this.selectedPlanet = data;
    this.planetSearchList = [];
    this.searchWord = '';
  }

  showOptions() {
    this.options = !this.options;
  }

  signOut() {
    this.options = !this.options;
    this.authnService.signout();
    this.navigateTo('signoff');
    this.commonService.removeInLocalStorage();
  }

  release(){
    this.options = false;
  }

  navigateTo(page: string) {
    if (page !== null) {
      this.commonService.navigateTo(page);
    }
  }
}

