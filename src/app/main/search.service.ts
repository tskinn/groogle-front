import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Result} from './result';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SearchService {
    constructor (http: Http) {
		  this.http = http;
	 }
	 private http: Http;
    getSearch (url: string): Observable <Result> {
		  console.log('Requesting Search...');
        return this.http.get(url)
            .map(res => <Result> res.json().data)
				.do(data => console.log(<Result>data))
					 .catch(this.handleError);
    }

	 getId(id: string): Observable <Result> {
		  console.log('Getting Result...');
	 	  return this.http.get(id)
	 			.map(res => <Result> res.json().data)
	 			.do(data => console.log('Hello ' + data.rank))
	 				 .catch(this.handleError);
	 }

    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
