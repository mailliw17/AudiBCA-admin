import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Swal from 'sweetalert2';

const GET_DATA_KTP =
  'http://ktp-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/ktp/user/';
const APPROVED_KTP =
  'http://ktp-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/approved/ktp/';
const REJECTED_KTP =
  'http://ktp-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/rejected/ktp/';
const APPROVED_NPWP =
  'http://ktp-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/approved/npwp/';
const REJECTED_NPWP =
  'http://ktp-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/rejected/npwp/';
const GET_DATA_NPWP =
  'http://ktp-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/npwp/user/';

@Component({
  selector: 'app-validasi-berkas-cek',
  templateUrl: './validasi-berkas-cek.component.html',
  styleUrls: ['./validasi-berkas-cek.component.css'],
})
export class ValidasiBerkasCekComponent implements OnInit {
  // childKtpFormReceived:any
  // childKtpFormReceived_alasan:any
  ktp: any = {};
  npwp: any = {};
  id!: string;
  ktpData: any = {};
  npwpData: any = {};

  // token for get anything data
  httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.getToken()}`
    ),
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private token: TokenStorageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getDataKtp();
    this.getDataNpwp();
  }

  getDataKtp(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.http.get<any>(GET_DATA_KTP + id, this.httpOptions_base).subscribe(
      (isi) => {
        // console.log(isi)
        this.ktpData = isi;
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error while fetching data KTP',
        });
        console.log(err);
      }
    );
  }

  getDataNpwp(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.http.get<any>(GET_DATA_NPWP + id, this.httpOptions_base).subscribe(
      (isi) => {
        this.npwpData = isi;
        // console.log(isi)
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error while fetching data NPWP',
        });
        console.log(err);
      }
    );
  }

  validasiKtpNpwp(): void {
    // dapat nih keduanya
    // console.log(this.ktp)
    // console.log(this.npwp)

    // KTP validation
    if (this.ktp.validitas == 1) {
      this.http
        .put<any>(APPROVED_KTP + this.ktpData.id, this.httpOptions_base)
        .subscribe(
          (isi) => {
            // nothing to do here
          },
          (err) => {
            // alert('Error while updating')
            console.log(err);
          }
        );
    } else {
      this.http
        .put<any>(
          REJECTED_KTP + this.ktpData.id,
          this.ktp.alasan,
          this.httpOptions_base
        )
        .subscribe(
          (isi) => {
            // nothing to do here
          },
          (err) => {
            // alert('Error while updating')
            console.log(err);
          }
        );
    }
    // EOF KTP validation

    // NPWP validation
    if (this.npwp.validitas == 1) {
      this.http
        .put<any>(APPROVED_NPWP + this.npwpData.id, this.httpOptions_base)
        .subscribe(
          (isi) => {
            // nothing to do here
          },
          (err) => {
            // alert('Error while updating')
            console.log(err);
          }
        );
    } else {
      this.http
        .put<any>(
          REJECTED_NPWP + this.npwpData.id,
          this.npwp.alasan,
          this.httpOptions_base
        )
        .subscribe(
          (isi) => {
            // nothing to do here
          },
          (err) => {
            // alert('Error while updating')
            console.log(err);
          }
        );
    }
    // EOF NPWP validation

    this.router.navigate(['validasi-berkas']);
  }
}
