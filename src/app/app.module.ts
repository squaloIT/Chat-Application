import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageWrapperComponent } from './main/messages/message-wrapper/message-wrapper.component';
import { FriendsWrapperComponent } from './main/friends/friends-wrapper/friends-wrapper.component';
import { AuthService } from './auth/auth.service';
import { UserProfile } from './user/user-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { UploadFileComponent } from './upload/upload-file/upload-file.component';
import { UploadFileService } from './upload/upload-file.service';
import { FriendItemComponent } from './main/friends/friends-wrapper/friend-item/friend-item.component';
import { MessageService } from './main/messages/messages.service';

@NgModule({
  declarations: [
    AppComponent,
    MessageWrapperComponent,
    FriendsWrapperComponent,
    FooterComponent,
    MainComponent,
    HeaderComponent,
    UploadFileComponent,
    FriendItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [AuthService, UserProfile, UploadFileService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
