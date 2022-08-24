import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Swal from 'sweetalert2';

const CREATE_API = 'http://10.1.137.50:8760/admin/v1/createSeller';

@Component({
  selector: 'app-akun-penjual-tambah',
  templateUrl: './akun-penjual-tambah.component.html',
  styleUrls: ['./akun-penjual-tambah.component.css'],
})
export class AkunPenjualTambahComponent implements OnInit {
  public createSellerAccountForm!: FormGroup;
  // isiForm!: string

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
    this.createSellerAccountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      password: ['', Validators.required],
      scdPassword: ['', Validators.compose([Validators.required])],
      phoneNum: [
        '',
        Validators.compose([
          Validators.pattern('^([0][8]|[+][6][2])[- +()0-9]+'),
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(14),
        ]),
      ],
      dateOb: ['', Validators.required],
    });
  }

  createOperator() {
    if (this.createSellerAccountForm.valid) {
      this.http
        .post<any>(
          CREATE_API,
          this.createSellerAccountForm.value,
          this.httpOptions_base
        )
        .subscribe(
          (isi) => {
            Swal.fire({
              title: 'Success',
              text: 'Create Success',
              icon: 'success',
            });
            this.createSellerAccountForm.reset();
            this.router.navigate(['akun-penjual']);
          },
          (err) => {
            Swal.fire({
              title: 'Error',
              text: 'Create Failed',
              icon: 'error',
            });
            console.log(err);
          }
        );
    } else {
      this.createSellerAccountForm.markAllAsTouched();
    }
  }
}
