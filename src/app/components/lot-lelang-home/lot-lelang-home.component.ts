import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, Subject, tap } from 'rxjs';
import { Organizer } from '../penyelenggara-home/penyelenggara-home.component';
import { Input } from '@angular/core';
import { LelangDataService } from 'src/app/_services/lelang-data.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../_services/spinner.service';

export interface Lelang {
  id: string;
  name: string;
  initialPrice: number;
  bidMethod: string;
  collateralQuantity: number;
  collateralExpire: string;
  bidStart: string;
  bidExpire: string;
  organizerId: string;
  sellerId: string;
  branchId: string;
  lotCode: string;
  dateCreated: string;
  createdBy: string;
  dateUpdated: string;
  updatedBy: string;
  dateDeleted: string;
  deletedBy: string;
  isActive: boolean;
  description: string;
  is_bought: boolean;
  attachment: any;
  image1: any;
  image2: any;
  image3: any;
  image4: any;
  image5: any;
}

export interface LelangDto {
  id: string;
  name: string;
  initialPrice: number;
  collateralQuantity: number;
  organizerId: string;
  sellerId: string;
  lotCode: string;
}

@Component({
  selector: 'app-lot-lelang-home',
  templateUrl: './lot-lelang-home.component.html',
  styleUrls: ['./lot-lelang-home.component.css'],
})
export class LotLelangHomeComponent implements OnInit {
  data: LelangDto[] = [];
  test: any[] = [];
  currentUser: any;

  displayedColumns: string[] = [
    'id',
    'name',
    'organizerName',
    'sellerName',
    'initialPrice',
    'collateralQuantity',
    'action',
  ];
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private lelserve: LelangDataService,
    private token: TokenStorageService,
    private router: Router,
    public spinner: SpinnerService
  ) {}
  // async lelsold(id:string){

  //   await this.lelserve.is_bought(id).subscribe(()=>{
  //     this.test.forEach((lel,index)=>{
  //       if (lel.id === id){
  //         this.test.splice(index,1)
  //         this.dataSource = new MatTableDataSource(this.test)
  //       }
  //     })
  //   })

  // }
  ngOnInit(): void {
    this.spinner.isLoading = true;
    this.getLelang();
  }

  getLelang(): void {
    this.lelserve.getLelang().subscribe((lel) => {
      // console.log(lel)
      var x: any = lel;
      this.test = x.content;

      // this.test.forEach((lel)=>{
      //   lel.organizer = lel.organizer.name
      //   lel.seller = lel.seller.name
      // })
      this.dataSource = new MatTableDataSource(this.test);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.isLoading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
