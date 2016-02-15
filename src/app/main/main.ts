import {Component} from 'angular2/core';
import {NgIf, NgFor} from 'angular2/common'
import {Observable} from 'rxjs/Rx';
import {Result} from './result';
import {SearchService} from './search.service';
import {HTTP_PROVIDERS} from 'angular2/http';

@Component({
	 selector: 'app',
	 template: `<div>
  <div *ngFor="#result of results">
	 <div *ngIf="result"> 
		Request Site: {{result.site}} <br>
		Matches:      {{result.indices.length}} <br>
		Page Length:  {{result.page.length}}
	 </div>
  </div>

  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
	 <input id="sample3" class="mdl-textfield__input" type="text" [value]="primary" (input)="primary = $event.target.value" autofocus>
	 <label class="mdl-textfield__label" for="sample3">Primary</label>
  </div>
  <br>
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
	 <input id="sample4" class="mdl-textfield__input" type="text" [value]="secondary" (input)="secondary = $event.target.value" autofocus>
	 <label class="mdl-textfield__label" for="sample4">Secondary</label>
  </div>
  <br>
  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" (click)="getSearch()">Search</button>
  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" (click)="getId()">Get</button>
  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" (click)="print()">Print</button>
</div>
`,
	 directives: [
		  NgIf,
		  NgFor
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
	 id: string

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
