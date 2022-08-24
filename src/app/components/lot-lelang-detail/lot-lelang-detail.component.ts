import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LelangDataService } from 'src/app/_services/lelang-data.service';
import { SpinnerService } from 'src/app/_services/spinner.service';
import { Lelang } from '../lot-lelang-home/lot-lelang-home.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lot-lelang-detail',
  templateUrl: './lot-lelang-detail.component.html',
  styleUrls: ['./lot-lelang-detail.component.css'],
})
export class LotLelangDetailComponent implements OnInit {
  displayattachment: any = {};
  images: string[] = [];
  colaexp: any = {};
  bidstart: any = {};
  bidexp: any = {};

  deleteLelang() {
    // console.log(this.lelang.id)
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
        this.lelserv.deleteLelang(this.lelang.id).subscribe(() => {
          this.router.navigate(['lot-lelang']);
        });
      }
    });
  }
  constructor(
    private route: ActivatedRoute,
    private lelserv: LelangDataService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  lelang: any = {};
  getLel() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.lelserv.getLelbyId(id).subscribe((lel) => {
      this.lelang = lel;
      this.displayattachment = this.lelang.attachment;
      this.colaexp = new Date(lel.collateralExpire).toString();
      this.bidstart = new Date(lel.bidStart).toString();
      this.bidexp = new Date(lel.bidExpire).toString();

      var imgs: string[] = [
        this.lelang.imageURL1,
        this.lelang.imageURL2,
        this.lelang.imageURL3,
        this.lelang.imageURL4,
        this.lelang.imageURL5,
      ];
      imgs = imgs.filter((x) => x !== null);

      this.images = imgs;
      this.spinner.isLoading = false;
    });
  }
  ngOnInit(): void {
    this.spinner.isLoading = true;
    this.getLel();
  }
}
