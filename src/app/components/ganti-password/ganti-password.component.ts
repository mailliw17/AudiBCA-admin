import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Swal from 'sweetalert2';

const CHANGE_PASSWORD_API =
  'http://user-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/user/v1/change-password';

@Component({
  selector: 'app-ganti-password',
  templateUrl: './ganti-password.component.html',
  styleUrls: ['./ganti-password.component.css'],
})
export class GantiPasswordComponent implements OnInit {
  public gantiPasswordForm!: FormGroup;

  // token for get anything data
  httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.getToken()}`
    ),
  };

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.gantiPasswordForm = this.formBuilder.group({
      id: this.token.getUser().id,
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  gantiPassword() {
    if (this.gantiPasswordForm.valid) {
      this.http
        .post<any>(
          CHANGE_PASSWORD_API,
          this.gantiPasswordForm.value,
          this.httpOptions_base
        )
        .subscribe(
          (isi) => {
            Swal.fire({
              title: 'Success',
              text: 'Change Password Success',
              icon: 'success',
            });
            this.gantiPasswordForm.reset();

            this.token.signOut(); //clean session in FE
            this.router.navigate(['/login']);
          },
          (err) => {
            // Swal.fire({
            //   title: 'Error',
            //   text: err.error.message,
            //   icon: 'error',
            // });
            // this.ngOnInit();
            console.log(err);
          }
        );
    } else {
      this.gantiPasswordForm.markAllAsTouched();
    }
  }
}
