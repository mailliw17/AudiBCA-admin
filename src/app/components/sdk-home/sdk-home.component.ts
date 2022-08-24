import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerService } from '../../_services/spinner.service';

export interface SDK {
  no: number,
  syarat: string,
}

const ELEMENT_DATA: SDK[] = [
  { no: 1, syarat: 'Peserta Lelang menyetujui transaksi yang dilakukan melalui aplikasi Lelang Melalui Internet dan tidak boleh melanggar peraturan perundang­ undangan yang berlaku di Indonesia.' },
  { no: 2, syarat: 'Peserta Lelang tunduk dan taat pada semua peraturan yang berlaku di Indonesia yang berhubungan dengan penggunaan jaringan dan komunikasi data, baik di wilayah Negara Kesatuan Republik Indonesia maupun dari dan keluar wilayah Negara Kesatuan Republik Indonesia.' },
  { no: 3, syarat: 'Waktu yang digunakan adalah waktu server.' },
  { no: 4, syarat: 'Peserta Lelang dianggap melakukan penawaran lelang secara sadar tanpa paksaan dari pihak mana pun dan penawaran lelang bersifat mengikat dan sah.' },
  { no: 5, syarat: 'Peserta Lelang bertanggung jawab penuh atas transaksi elektronik yang dilakukan dengan menggunakan aplikasi Lelang Melalui Internet.' },
  { no: 6, syarat: 'Peserta Lelang wajib menjaga kerahasiaan user ID dan password masing­-masing. Penyelenggara Lelang Melalui Internet tidak bertanggung jawab atas segala akibat penyalahgunaan akun Peserta Lelang.' },
];

@Component({
  selector: 'app-sdk-home',
  templateUrl: './sdk-home.component.html',
  styleUrls: ['./sdk-home.component.css']
})
export class SdkHomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['no', 'syarat', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public spinner : SpinnerService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
