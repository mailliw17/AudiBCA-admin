import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BranchDataService } from 'src/app/_services/branch-data.service';
import { SpinnerService } from 'src/app/_services/spinner.service';
import Swal from 'sweetalert2';

export interface Branch {
  id: string,
  name: string,
  type: string,
  address: string,
  province: string,
  initial: string,
  seller: string,
  dateCreated: string,
  createdBy: string,
  dateUpdated: string,
  updatedBy: string,
  dateDeleted: string,
  deletedBy: string,
  isActive: boolean
}


@Component({
  selector: 'app-cabang-penjual-home',
  templateUrl: './cabang-penjual-home.component.html',
  styleUrls: ['./cabang-penjual-home.component.css']
})
export class CabangPenjualHomeComponent implements OnInit {
  faEdit = faPencilAlt;
  faDelete = faTrash;
  branches: Branch[] = [];
  displayedColumns: string[] = [ 'name', 'address', 'initial', 'seller', 'province', 'type', 'action'];
  dataSource = new MatTableDataSource(this.branches);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //DI
  constructor(
    private branchserv: BranchDataService,
    private router:Router,
    public spinner: SpinnerService
  ) { }



  deleteBranch(id: string) {
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
        this.branchserv.deleteBranch(id).subscribe(()=>{
          this.getBranch()
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

  ngOnInit(): void {
    this.spinner.isLoading = true
    this.getBranch();

  }

  getBranch() : void {
    this.branchserv.getBranch().subscribe(branch => {
      var y: any = branch
      this.branches = y.content
      this.branches.forEach((branch)=>{
        this.branchserv.getSellerId(branch.seller).subscribe(sel=>{
          branch.seller = sel.name
          this.spinner.isLoading = false
        },err=>{
          branch.seller = 'PENJUAL DELETED'
          this.spinner.isLoading = false
        })
      })
      this.dataSource = new MatTableDataSource(this.branches)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
