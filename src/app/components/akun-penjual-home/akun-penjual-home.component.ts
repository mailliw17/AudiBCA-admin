import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { SpinnerService } from '../../_services/spinner.service';
import Swal from 'sweetalert2';

const READ_API =
  'http://user-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/admin/v1/getAll?role=seller';
const DELETE_API =
  'http://user-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/admin/v1/delete/';
const GET_BYID_API =
  'http://user-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/user/v1/';

@Component({
  selector: 'app-akun-penjual-home',
  templateUrl: './akun-penjual-home.component.html',
  styleUrls: ['./akun-penjual-home.component.css'],
})
export class AkunPenjualHomeComponent implements OnInit {
  // token for get anything data
  httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.getToken()}`
    ),
  };

  displayedColumns: string[] = ['no', 'nama', 'username', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private router: Router,
    private token: TokenStorageService,
    public spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.isLoading = true;
    this.getAllData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllData() {
    this.http.get<any>(READ_API, this.httpOptions_base).subscribe(
      (isi) => {
        this.dataSource = new MatTableDataSource(isi.content);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.isLoading = false;
      },
      (err) => {
        this.spinner.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
        console.log(err);
      }
    );
  }

  deleteSeller(id: string) {
    this.http.delete<any>(DELETE_API + id, this.httpOptions_base).subscribe(
      (isi) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data berhasil dihapus',
        });
        this.getAllData();
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
}
