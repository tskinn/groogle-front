import {Component} from 'angular2/core';
import {NgIf, NgFor} from 'angular2/common';
import {Observable} from 'rxjs/Rx';
import {Result} from './result';
import {SearchService} from './search.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ListItem} from './list-item.component';

@Component({
	 selector: 'app',
	 templateUrl: 'app/main/main.html',
	 styleUrls: ['app/main/main.css'],
	 directives: [
		  NgIf,
		  NgFor,
		  ListItem
	 ],
	 providers: [
		  HTTP_PROVIDERS,
		  SearchService
	 ]
})
export class App {
	 greeting = 'Hello World';
	 primary: string = '';
	 secondary: string = '';
	 c: number = 0;
    errorMessage: string;
    results = [];
	 id: string;

	 private _searchUrl = "http://localhost:8080/search?";
	 private _idUrl = "http://localhost:8080/id/";
	 
	 
    constructor(private _searchService: SearchService) {}

    getSearch() {
		  this.results = [];
		  var searchstring = this._searchUrl + "primary=" + this.primary + "&secondary=" + this.secondary;
		  this._searchService.getSearch(searchstring).subscribe(
				result => this.id = result.id,
            error => this.errorMessage = <any>error,
				() => this.getId());
    }

	 getId() {
		  this._searchService.getId(this._idUrl + this.id).subscribe(
				result => {
					 if (result.id) {
						  this.results[result.rank] = <Result>result
					 }
					 this.id = result.id
				},
            error => this.errorMessage = <any>error,
				() => {
					 if (this.id) {
						  this.getId();
					 } else {
						  console.log("Done");
					 }
				}
		  );
	 }

	 print() {
		  for (var i = 0; i < this.results.length; i++) {
				console.log(<Result>this.results[i])
		  }
	 }
}
