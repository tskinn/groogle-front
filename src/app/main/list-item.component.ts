import {Component, Input} from 'angular2/core';
import {Result} from './result';

@Component({
	 selector: 'list-item',
	 template: `
<div *ngIf="result" class="page_group">
Site: {{ result.site }} <br>
Rank: {{ result.rank }} <br>

  <ul>
    <li *ngFor="#index of result.indices" class="context">
      <div>{{ result.page.slice(index - 30, index + 30) }}</div>
    </li>
  </ul>
</div>
`,
	 styles: ['.page_group {	 border: dotted;	 background-color: red;}']

})
export class ListItem {
	 @Input() result: Result;
}
