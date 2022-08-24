import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LelangDataService } from 'src/app/_services/lelang-data.service';
import { PenjualDataService } from 'src/app/_services/penjual-data.service';
import { SpinnerService } from 'src/app/_services/spinner.service';
import Swal from 'sweetalert2';

export interface Seller {
  id: string,
  name: string,
  industry: string,
  address: string,
  phoneNum: string,
  fax: string,
  dateCreated: string,
  dateUpdated: string,
  updatedBy: string,
  dateDeleted: string,
  deletedBy: string,
  isActive: boolean

}



@Component({
  selector: 'app-penjual-home',
  templateUrl: './penjual-home.component.html',
  styleUrls: ['./penjual-home.component.css']
})
export class PenjualHomeComponent implements OnInit {
  faEdit = faPencilAlt;
  faDelete = faTrash;
  sellers: Seller[] = [];
  displayedColumns: string[] = [ 'name', 'address', 'industry', 'phoneNum', 'fax', 'action'];
  dataSource = new MatTableDataSource(this.sellers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  deleteSeller(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.sellerserv.deleteSeller(id).subscribe(()=>{
          this.getSeller()
        })
      } else {
        Swal.fire(
          'Cancelled',
          'Your seller file is safe :)',
          'error'
        )
      }
    })
  }

  constructor(private sellerserv:PenjualDataService, private router:Router, private spinner: SpinnerService) { }


  ngOnInit(): void {
    this.spinner.isLoading = true
    this.getSeller()
  }

  getSeller() : void {
    this.sellerserv.getSeller().subscribe(seller => {
      var x: any = seller
      this.sellers = x.content
      this.dataSource = new MatTableDataSource(this.sellers)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.isLoading = false
      // console.log(this.sellers)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
