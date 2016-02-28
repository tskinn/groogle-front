import {Component, Input} from 'angular2/core';
import {Result} from './result';

@Component({
	 selector: 'list',
	 styleUrls: ['app/main/list.css'],
	 templateUrl: 'app/main/list.html' 
})
export class List {
	 @Input() result: Result;
}
