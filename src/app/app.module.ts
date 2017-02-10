import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ModalSelectUserComponent } from '../components/modal-select-user/modal-select-user';
import { HttpService } from '../providers/http-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalSelectUserComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalSelectUserComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, HttpService]
})
export class AppModule {}
