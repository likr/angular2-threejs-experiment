import {provide, RootRenderer} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {MyRootRenderer} from './my-renderer'

bootstrap(AppComponent, [
  provide(RootRenderer, {useClass: MyRootRenderer}),
]);
