import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { StudentService } from './shared/student.service';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentComponent } from './students/student/student.component';
import { TrackerviewComponent } from './trackerview/trackerview.component';
import { TopicviewComponent } from './topicview/topicview.component';
import { HomeviewComponent } from './homeview/homeview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    NavbarComponent,
    StudentListComponent,
    StudentComponent,
    TrackerviewComponent,
    TopicviewComponent,
    HomeviewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,// imports firebase/auth, only needed for auth features
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
