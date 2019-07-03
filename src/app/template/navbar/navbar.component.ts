import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user;

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = userService.afAuth.user;
   }

  ngOnInit() {
    // console.log('user', this.user);
  }
  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['/']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
