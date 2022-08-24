import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Operator } from '../operator-home/operator';
import Swal from 'sweetalert2';

const GET_OPERATOR_BYID_API = 'http://10.1.137.50:8080/auth/user/v1/';
const UPDATE_OPERATOR_API = 'http://10.1.137.50:8760/user/v1/update/';

@Component({
  selector: 'app-operator-edit',
  templateUrl: './operator-edit.component.html',
  styleUrls: ['./operator-edit.component.css'],
})
export class OperatorEditComponent implements OnInit {
  public editOperator: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    phoneNum: new FormControl(''),
    dateOb: new FormControl(''),
  });
  editOperatorForm: any = {};
  // public editOperatorForm !: FormGroup

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
    private token: TokenStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editOperator = this.formBuilder.group({
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
    this.getOperator();
  }

  getOperator(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.http
      .get<any>(GET_OPERATOR_BYID_API + id, this.httpOptions_base)
      .subscribe(
        (isi) => {
          // console.log(isi)
          // lempar data ke view
          this.editOperatorForm = isi;
        },
        (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.message,
            icon: 'error',
          });
          console.log(err);
        }
      );
  }

  updateOperator(): void {
    // console.log(this.editOperatorForm)
    if (this.editOperator.valid) {
      const id = String(this.route.snapshot.paramMap.get('id'));
      // console.log(this.editOperatorForm)
      this.http
        .put<any>(
          UPDATE_OPERATOR_API + id,
          this.editOperatorForm,
          this.httpOptions_base
        )
        .subscribe(
          (isi) => {
            this.router.navigate(['/akun-operator']);
          },
          (err) => {
            Swal.fire({
              title: 'Error',
              text: err.error.message,
              icon: 'error',
            });
            console.log(err);
          }
        );
    } else {
      this.editOperator.markAllAsTouched();
    }
  }
}
