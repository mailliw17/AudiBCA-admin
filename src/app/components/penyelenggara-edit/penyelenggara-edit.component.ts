import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Organizer } from '../penyelenggara-home/penyelenggara-home.component';
import Swal from 'sweetalert2';

const GET_ORGANIZER_BYID_API = 'http://10.1.137.50:8762/get/'
const UPDATE_ORGANIZER_API = 'http://10.1.137.50:8762/update/'

@Component({
  selector: 'app-penyelenggara-edit',
  templateUrl: './penyelenggara-edit.component.html',
  styleUrls: ['./penyelenggara-edit.component.css']
})
export class PenyelenggaraEditComponent implements OnInit {
  curorg:any={};
  public editOrganizer:FormGroup = new FormGroup({
    address: new FormControl(''),
    fax: new FormControl(''),
    name: new FormControl(''),
    phoneNum: new FormControl(''),


  });
  editOrganizerForm: any = {}

  // token for get anything data
  httpOptions_base = {
    headers: new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token.getToken()}`
    )
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private token: TokenStorageService,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.getOrganizer()
    this.editOrganizer = this.formBuilder.group({
      address: ['',Validators.required],
      fax: ['',Validators.compose([Validators.pattern('^[- +()0-9]+'),Validators.required,Validators.minLength(7), Validators.maxLength(15)])],
      name: ['',Validators.required],
      phoneNum: ['',Validators.compose([Validators.pattern('^([0][8]|[+][6][2])[- +()0-9]+'),Validators.required, Validators.minLength(10), Validators.maxLength(14)])]
    })
  }

  getOrganizer(): void {
    const id = String(this.route.snapshot.paramMap.get('id'))
    this.http.get<any>(GET_ORGANIZER_BYID_API + id, this.httpOptions_base)
      .subscribe(isi => {
        // console.log(isi)
        // lempar data ke view
        this.editOrganizerForm = isi
        this.curorg = isi
      },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      )
  }

  updateOrganizer(): void {
    if (this.editOrganizer.valid){
    const id = String(this.route.snapshot.paramMap.get('id'))
    this.http.put<any>(UPDATE_ORGANIZER_API + id, this.editOrganizerForm, this.httpOptions_base)
      .subscribe(
        isi => {

          this.router.navigate(['/penyelenggara'])
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          })
        }
      )
    }
    else{
      this.editOrganizerForm.markAllAsTouched();
    }
  }
}
