import {Component, Input} from 'angular2/core';
import {Result} from './result';

@Component({
	 selector: 'list-item',
	 styleUrls: ['app/main/list-item.css'],
	 templateUrl: 'app/main/list-item.html' 
})
export class ListItem {
	 @Input() result: Result;
}
