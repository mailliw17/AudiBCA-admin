import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { ProfileService } from 'src/app/_services/profile.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from './user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  currentUser: any;

  constructor(
    private token: TokenStorageService,
    private router: Router,
    private auth: AuthService,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {
    const userData = this.profile.getUserData().subscribe(
      (isi) => {
        this.token.saveUser(isi);
        //lempar currentUser ke view
        this.currentUser = this.token.getUser();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout(): void {
    this.auth.logout().subscribe(
      (isi) => {
        this.token.signOut();
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
