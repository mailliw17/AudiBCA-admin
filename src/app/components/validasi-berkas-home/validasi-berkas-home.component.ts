import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/_services/spinner.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Swal from 'sweetalert2';

const GET_ALL_API = 'http://10.1.137.50:8761/approval/getAll';

@Component({
  selector: 'app-validasi-berkas-home',
  templateUrl: './validasi-berkas-home.component.html',
  styleUrls: ['./validasi-berkas-home.component.css'],
})
export class ValidasiBerkasHomeComponent implements OnInit {
  // token for get anything data
  httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.getToken()}`
    ),
  };

  displayedColumns: string[] = [
    'namaLengkap',
    'phoneNum',
    'email',
    'ktp',
    'npwp',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private router: Router,
    private token: TokenStorageService,
    private spinner: SpinnerService
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
    this.http.get<any>(GET_ALL_API, this.httpOptions_base).subscribe(
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
}
