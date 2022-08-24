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
import Swal from 'sweetalert2';

const GET_BYID_API =
  'http://user-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/user/v1/';
const UPDATE_API =
  'http://user-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/user/v1/update/';

@Component({
  selector: 'app-akun-penjual-edit',
  templateUrl: './akun-penjual-edit.component.html',
  styleUrls: ['./akun-penjual-edit.component.css'],
})
export class AkunPenjualEditComponent implements OnInit {
  public editSellerAccountForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    phoneNum: new FormControl(''),
    dateOb: new FormControl(''),
  });
  editSellerForm: any = {};
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
    this.editSellerAccountForm = this.formBuilder.group({
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
    this.http.get<any>(GET_BYID_API + id, this.httpOptions_base).subscribe(
      (isi) => {
        // console.log(isi)
        // lempar data ke view
        this.editSellerForm = isi;
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
        console.log(err);
      }
    );
  }

  updateOperator(): void {
    if (this.editSellerAccountForm.valid) {
      // console.log(this.editSellerForm)
      const id = String(this.route.snapshot.paramMap.get('id'));
      this.http
        .put<any>(UPDATE_API + id, this.editSellerForm, this.httpOptions_base)
        .subscribe(
          (isi) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Update Success',
            });
            this.router.navigate(['/akun-penjual']);
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });

            console.log(err);
          }
        );
    } else {
      this.editSellerAccountForm.markAllAsTouched();
    }
  }
}
