import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from '../penjual-home/penjual-home.component';
import { Lelang } from '../lot-lelang-home/lot-lelang-home.component';
import { LotLelangHomeComponent } from '../lot-lelang-home/lot-lelang-home.component';
import { Organizer } from '../penyelenggara-home/penyelenggara-home.component';
import { Branch } from '../cabang-penjual-home/cabang-penjual-home.component';
import { LelangDataService } from 'src/app/_services/lelang-data.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { CurrencyMaskInputMode } from 'ngx-currency';

function validatedate(c: FormControl) {
  var now = new Date();
  var dt = new Date(c.value);

  return dt > now
    ? null
    : {
        validatedate: {
          tooearly: false,
        },
      };
}

@Component({
  selector: 'app-lot-lelang-tambah',
  templateUrl: './lot-lelang-tambah.component.html',
  styleUrls: ['./lot-lelang-tambah.component.css'],
})
export class LotLelangTambahComponent implements OnInit {

  validateall(form: FormGroup) {
    var a: any = this.Leladd.controls['leljoinenddate']?.value; //waktu selesai lelang
    var b: any = this.Leladd.controls['lelbidstart']?.value; //waktu mulai lelang
    var c: any = this.Leladd.controls['lelenddate']?.value; //batas akhir jaminan

    if (a === '' || b === '' || c == '') {
      return null;
    }
    var dta = new Date(a);
    var dtb = new Date(b);
    var dtc = new Date(c);

    var f: boolean = dtc < dta && dtb > dtc && dtb < dta;

    return f
      ? null
      : {
          validateall: {
            valid: false,
          },
        };
  }

  options = { prefix: 'Rp. ' ,thousands: '.', decimal: ',', allowZero: true,
  inputMode: CurrencyMaskInputMode.FINANCIAL, nullable: true, precision: 0 };
  progress: number = 0;
  images: string[] = [];
  tempimg: any[] = [];
  attachment: any = {};

  Leladd: FormGroup = new FormGroup({
    lelname: new FormControl(''),
    lelinitialprice: new FormControl(''),
    lelbidtype: new FormControl(''),
    lelcolaqty: new FormControl(''),
    leljoinenddate: new FormControl(''),
    lelbidstart: new FormControl(''),
    lelenddate: new FormControl(''),
    lelorg: new FormControl(''),
    lelseller: new FormControl(''),
    lelbranch: new FormControl(''),
    desc: new FormControl(''),
    lelattachment: new FormControl(''),
    imginp: new FormControl(''),
  });
  leladdform() {
    this.Leladd = this.fb.group({
      lelname: ['', Validators.required],
      lelinitialprice: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^([1-9])[- +()0-9]+'),
        ]),
      ],
      lelbidtype: ['', Validators.required],
      lelcolaqty: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^([1-9])[- +()0-9]+'),
        ]),
      ],
      leljoinenddate: [
        '',
        Validators.compose([
          Validators.required,
          this.validateall.bind(this),
          validatedate,
        ]),
      ],
      lelbidstart: [
        '',
        Validators.compose([
          Validators.required,
          this.validateall.bind(this),
          validatedate,
        ]),
      ],
      lelenddate: [
        '',
        Validators.compose([
          Validators.required,
          this.validateall.bind(this),
          validatedate,
        ]),
      ],
      lelorg: ['', Validators.required],
      lelseller: ['', Validators.required],
      lelbranch: ['', Validators.required],
      desc: ['', Validators.required],
      lelattachment: ['', Validators.required],
      imginp: ['', Validators.required],
    });
  }

  onAttachmentChange(event: any) {
    if (event.target.files.length === 1) {
      this.attachment = event.target.files[0];
    }
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.images = [];
      this.tempimg = [];
      var filesAmount = event.target.files.length;
      if (filesAmount < 6) {
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();

          reader.onload = (event: any) => {
            this.images.push(event.target.result);

            this.Leladd.patchValue({
              fileSource: this.images,
            });
          };

          reader.readAsDataURL(event.target.files[i]);
          this.tempimg.push(event.target.files[i]);
        }
      } else {
        this.Leladd.controls['imginp'].setErrors({ incorrect: true });
      }
    }
  }

  org_array: Organizer[] = [];
  seller_array: Seller[] = [];
  branch_array: Branch[] = [];
  constructor(
    private fb: FormBuilder,
    private lelserv: LelangDataService,
    private router: Router
  ) {
    this.leladdform();
  }

  add(leladdform: any): void {
    //missing lampiran, and branch stuff
    if (leladdform.valid) {
      var newlel: Lelang = {
        id: 'null',
        name: leladdform.value.lelname,
        initialPrice: Number(leladdform.value.lelinitialprice),
        bidMethod: leladdform.value.lelbidtype,
        collateralQuantity: Number(leladdform.value.lelcolaqty),
        collateralExpire: leladdform.value.lelenddate,
        bidExpire: leladdform.value.leljoinenddate,
        organizerId: leladdform.value.lelorg.id,
        sellerId: leladdform.value.lelseller.id,
        bidStart: leladdform.value.lelbidstart,
        lotCode: 'null',
        dateCreated: 'null',
        createdBy: 'null',
        dateUpdated: 'null',
        updatedBy: 'null',
        dateDeleted: 'null',
        deletedBy: 'null',
        isActive: true,
        description: leladdform.value.desc,
        branchId: leladdform.value.lelbranch.id,
        is_bought: false,
        attachment: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
      };

      var y = new Date(newlel.bidExpire);
      newlel.bidExpire = y.setSeconds(y.getSeconds()).toString();
      var x = new Date(newlel.bidStart);
      newlel.bidStart = x.setSeconds(x.getSeconds()).toString();
      var z = new Date(newlel.collateralExpire);
      newlel.collateralExpire = z.setSeconds(z.getSeconds()).toString();

      console.log(newlel);
      this.lelserv
        .AddLelang(newlel, this.tempimg, this.attachment)
        .subscribe((lel) => {
          newlel = lel;
          this.router.navigate(['lot-lelang']);
        });
    } else {
      this.Leladd.markAllAsTouched();
    }
  }

  get_lists() {
    this.lelserv.getOrganizer().subscribe((org) => {
      var x: any = org;
      this.org_array = x.content;
    });
    this.lelserv.getSeller().subscribe((seller) => {
      var y: any = seller;
      this.seller_array = y.content;
    });
  }
  updateBranch() {
    var sellerid: any = this.Leladd.value.lelseller.id;

    this.lelserv.getBranch(sellerid).subscribe((branch) => {
      var z: any = branch;
      this.branch_array = z.content;
    });
  }
  ngOnInit(): void {
    this.get_lists();
  }
}
