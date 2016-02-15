import {bootstrap} from 'angular2/platform/browser';
import {App} from './main/main';
import {HTTP_PROVIDERS} from 'angular2/http'

bootstrap(App, [
	 HTTP_PROVIDERS
]);
