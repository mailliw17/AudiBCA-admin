import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/_services/profile.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Swal from 'sweetalert2';
// import { Operator } from '../operator-home/operator-home.component';

const CREATE_OPERATOR_API =
  'http://user-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/admin/v1/createOperator';

@Component({
  selector: 'app-operator-tambah',
  templateUrl: './operator-tambah.component.html',
  styleUrls: ['./operator-tambah.component.css'],
})
export class OperatorTambahComponent implements OnInit {
  public createOperatorForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    scdPassword: new FormControl(''),
    phoneNum: new FormControl(''),
    dateOb: new FormControl(''),
  });

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
    this.createOperatorForm = this.formBuilder.group({
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
    if (this.createOperatorForm.valid) {
      this.http
        .post<any>(
          CREATE_OPERATOR_API,
          this.createOperatorForm.value,
          this.httpOptions_base
        )
        .subscribe(
          (isi) => {
            Swal.fire({
              title: 'Success',
              text: 'Create Operator Success',
              icon: 'success',
            });
            this.createOperatorForm.reset();
            this.router.navigate(['akun-operator']);
          },
          (err) => {
            Swal.fire({
              title: 'Error',
              text: err.error.message,
              icon: 'error',
            });
          }
        );
    } else {
      this.createOperatorForm.markAllAsTouched();
    }
  }
}
