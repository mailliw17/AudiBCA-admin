import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Swal from 'sweetalert2';

const CREATE_ORGANIZER_API = 'http://10.1.137.50:8762/create'

@Component({
  selector: 'app-penyelenggara-tambah',
  templateUrl: './penyelenggara-tambah.component.html',
  styleUrls: ['./penyelenggara-tambah.component.css']
})
export class PenyelenggaraTambahComponent implements OnInit {
  public createOrganizerForm !: FormGroup

  // token for get anything data
  httpOptions_base = {
    headers: new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token.getToken()}`
    )
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private token: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.createOrganizerForm = this.formBuilder.group({
      address: ['',Validators.required],
      fax: ['',Validators.compose([Validators.pattern('^[- +()0-9]+'),Validators.required,Validators.minLength(7), Validators.maxLength(15)])],
      name: ['',Validators.required],
      phoneNum: ['',Validators.compose([Validators.pattern('^([0][8]|[+][6][2])[- +()0-9]+'),Validators.required, Validators.minLength(10), Validators.maxLength(14)])]
    })
  }

  createOrganizer() {
    if (this.createOrganizerForm.valid){
    this.http.post<any>(CREATE_ORGANIZER_API, this.createOrganizerForm.value, this.httpOptions_base)
      .subscribe(
        isi => {
          Swal.fire({
            title: 'Success',
            text: 'Data berhasil ditambahkan',
            icon: 'success',
          })
          this.createOrganizerForm.reset()
          this.router.navigate(['penyelenggara'])
        },
        err => {
          Swal.fire({
            title: 'Error',
            text: 'Data gagal ditambahkan',
            icon: 'error',
          })
          console.log(err)
        }
      )
    }
    else{
      this.createOrganizerForm.markAllAsTouched();
    }
  }

}
