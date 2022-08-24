import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { ProfileService } from 'src/app/_services/profile.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from '../sidebar/user';
import { SidebarComponent } from '../sidebar/sidebar.component';
import Swal from 'sweetalert2';
const PROFILE_API = 'http://10.1.137.50:8760/user/v1/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userData: any;
  currentUser: any;

   // token for get anything data
   httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.tokenStorage.getToken()}`
      ),
    };

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private profile: ProfileService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      (data) => {
        // menyimpan access_token di session storage
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveRefreshToken(data.refresh_token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.routingUserByRole();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    )
  }

  reloadPage(): void {
    window.location.reload();
  }

  routingUserByRole(): any {
    this.http.get(PROFILE_API, this.httpOptions_base).subscribe(
      (isi) => {
        this.tokenStorage.saveUser(isi);
        this.currentUser = this.tokenStorage.getUser();
        // console.log(oke);
        // console.log(this.currentUser.role[0])

        if (this.currentUser.role[0] == 'admin') {
          this.router.navigate(['/lot-lelang']);
        } else if (this.currentUser.role[0] == 'operator') {
          this.router.navigate(['/validasi-berkas']);
        } else if (this.currentUser.role[0] == 'user') {
          this.authService.logout();
          this.tokenStorage.signOut();
          // swal fire with button ok
          Swal.fire({
            title: 'Oops...',
            text: 'Anda tidak memiliki akses!',
            icon: 'error',
            confirmButtonText: 'OK'
          }).then(() => {
            this.reloadPage();
          })
        }
      },
      (err) => {
        console.log('Error when routing');
      }
    );
  }

}
