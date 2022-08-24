import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FAQDataService } from 'src/app/_services/faqdata.service';
import { SpinnerService } from '../../_services/spinner.service';
import Swal from 'sweetalert2';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  dateCreated: string;
  createdBy: string;
  dateUpdated: string;
  updatedBy: string;
  dateDeleted: string;
  deletedBy: string;
  isActive: boolean;
}

@Component({
  selector: 'app-faq-home',
  templateUrl: './faq-home.component.html',
  styleUrls: ['./faq-home.component.css'],
})
export class FaqHomeComponent implements OnInit {
  faEdit = faPencilAlt;
  faDelete = faTrash;
  faq_array: FAQ[] = [];
  displayedColumns: string[] = ['question', 'answer', 'action'];
  dataSource = new MatTableDataSource(this.faq_array);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private faqserv: FAQDataService,
    private route: Router,
    public spinner: SpinnerService
  ) {}

  deleteFAQ(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.faqserv.deleteFAQ(id).subscribe(() => {
          this.getFAQ();
        });
      } else {
        Swal.fire('Cancelled', 'Your FAQ is safe :)', 'error');
      }
    });
  }

  ngOnInit(): void {
    this.spinner.isLoading = true;
    this.getFAQ();
  }

  getFAQ(): void {
    this.faqserv.getFAQ().subscribe((arr) => {
      // console.log()
      var z: any = arr;
      this.faq_array = z.faqs;
      this.dataSource = new MatTableDataSource(this.faq_array);
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
