import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Seller } from '../penjual-home/penjual-home.component';
import { Organizer } from '../penyelenggara-home/penyelenggara-home.component';
import { Lelang } from '../lot-lelang-home/lot-lelang-home.component';
import { Branch } from '../cabang-penjual-home/cabang-penjual-home.component';
import { LelangDataService } from 'src/app/_services/lelang-data.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
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
  selector: 'app-lot-lelang-edit',
  templateUrl: './lot-lelang-edit.component.html',
  styleUrls: ['./lot-lelang-edit.component.css'],
})
export class LotLelangEditComponent implements OnInit {
  validateall(form: FormGroup) {
    var a: any = this.Leledit.controls['leljoinenddate']?.value; //waktu selesai lelang
    var b: any = this.Leledit.controls['lelbidstart']?.value; //waktu mulai lelang
    var c: any = this.Leledit.controls['lelenddate']?.value; //batas akhir jaminan

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

  options = {
    prefix: 'Rp. ',
    thousands: '.',
    decimal: ',',
    allowZero: true,
    inputMode: CurrencyMaskInputMode.FINANCIAL,
    nullable: true,
    precision: 0,
  };

  selected = 'domain';
  Leledit: FormGroup = new FormGroup({
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
  leleditform() {
    this.Leledit = this.fb.group({
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
          validatedate,
          this.validateall.bind(this),
        ]),
      ],
      lelbidstart: [
        '',
        Validators.compose([
          Validators.required,
          validatedate,
          this.validateall.bind(this),
        ]),
      ],
      lelenddate: [
        '',
        Validators.compose([
          Validators.required,
          validatedate,
          this.validateall.bind(this),
        ]),
      ],
      lelorg: [''],
      lelseller: [''],
      lelbranch: [''],
      desc: ['', Validators.required],
      lelattachment: [''],
      imginp: [''],
    });
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private lelserv: LelangDataService,
    private router: Router,
    private domSanitizer: DomSanitizer
  ) {
    this.leleditform();
  }
  org_array: Organizer[] = [];
  seller_array: Seller[] = [];
  branch_array: Branch[] = [];
  images: string[] = [];
  tempimg: any[] = [];
  tempbranch: any = {};
  attachment: any = '';
  displayattachment: any = '';
  lelang: any = {};

  async imagelooper(imgs: any[]) {
    for (var x in imgs) {
      var z: any = await this.lelserv.filegetterimg(imgs[x]).then((t) => {
        var file = new File([t], 'name');
        this.tempimg.push(file);
      });
    }
  }

  getLel() {
    var str = new String('');
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.lelserv.getLelbyId(id).subscribe((lel) => {
      this.lelang = lel;
      this.lelserv.filegetter(this.lelang.attachment).subscribe((attach) => {
        this.attachment = new File([attach], 'attachment');
      });

      this.displayattachment = this.lelang.attachment;

      this.tempbranch = this.lelang.branch;

      var imgs: string[] = [
        this.lelang.imageURL1,
        this.lelang.imageURL2,
        this.lelang.imageURL3,
        this.lelang.imageURL4,
        this.lelang.imageURL5,
      ];
      imgs = imgs.filter((x) => x !== null);

      this.imagelooper(imgs);

      this.images = imgs;

      str = this.lelang.bidExpire;
      var x = new Date(this.lelang.bidExpire);
      str = new Date(x.setHours(x.getHours() + 7)).toISOString();
      str = str.substring(0, str.length - 5);
      this.lelang.bidExpire = str;
      // console.log(this.lelang.bidExpire)

      str = this.lelang.collateralExpire;
      var x = new Date(this.lelang.collateralExpire);
      str = new Date(x.setHours(x.getHours() + 7)).toISOString();
      str = str.substring(0, str.length - 5);
      this.lelang.collateralExpire = str;
      // console.log(this.lelang.collateralExpire)

      str = this.lelang.bidStart;
      var x = new Date(this.lelang.bidStart);
      str = new Date(x.setHours(x.getHours() + 7)).toISOString();
      str = str.substring(0, str.length - 5);
      this.lelang.bidStart = str;
      this.lelserv.getBranch(this.lelang.seller.id).subscribe((branch) => {
        var z: any = branch;
        this.branch_array = z.content;

        this.Leledit.patchValue({
          lelname: this.lelang.name,
          lelinitialprice: this.lelang.initialPrice,
          lelbidtype: this.lelang.bidMethod,
          lelcolaqty: this.lelang.collateralQuantity,
          leljoinenddate: this.lelang.bidExpire,
          lelbidstart: this.lelang.bidStart,
          lelenddate: this.lelang.collateralExpire,
          lelorg: this.lelang.organizer.id,
          lelseller: this.lelang.seller.id,
          lelbranch: this.lelang.branch.id,
          desc: this.lelang.description,
        });
      });
    });
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
    var sellerid: any = this.Leledit.value.lelseller.id;

    this.lelserv.getBranch(sellerid).subscribe((branch) => {
      var z: any = branch;
      this.branch_array = z.content;
      if (sellerid != this.lelang.seller.id) {
        this.tempbranch = this.branch_array[0];
      } else {
        this.tempbranch = this.lelang.branch;
      }
    });
  }
  update(leleditform: any) {
    if (leleditform.valid) {
      var newlel: Lelang = {
        id: this.lelang.id,
        name: leleditform.value.lelname,
        initialPrice: Number(leleditform.value.lelinitialprice),
        bidMethod: leleditform.value.lelbidtype,
        collateralQuantity: Number(leleditform.value.lelcolaqty),
        collateralExpire: leleditform.value.lelenddate,
        bidExpire: leleditform.value.leljoinenddate,
        organizerId: leleditform.value.lelorg,
        sellerId: leleditform.value.lelseller.id,
        bidStart: leleditform.value.lelbidstart,
        lotCode: this.lelang.lotCode,
        dateCreated: this.lelang.dateCreated,
        createdBy: this.lelang.createdBy,
        dateUpdated: this.lelang.dateUpdated,
        updatedBy: this.lelang.updatedBy,
        dateDeleted: this.lelang.dateDeleted,
        deletedBy: this.lelang.deletedBy,
        isActive: this.lelang.isActive,
        description: leleditform.value.desc,
        branchId: leleditform.value.lelbranch.id,
        is_bought: this.lelang.is_bought,
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

      if (newlel.sellerId === '' || newlel.sellerId === undefined) {
        newlel.sellerId = this.lelang.seller.id;
      }
      if (newlel.organizerId === '' || newlel.organizerId === undefined) {
        newlel.organizerId = this.lelang.organizer.id;
      }
      if (newlel.branchId === '' || newlel.branchId === undefined) {
        newlel.branchId = this.lelang.branch.id;
      }

      this.lelserv
        .updateLel(this.lelang.id, newlel, this.tempimg, this.attachment)
        .subscribe(
          (lel) => {
            this.lelang = lel;
            this.router.navigate(['lot-lelang']);
          },
          (err) => {
            alert('Error update data');
            console.log(err);
          }
        );
    } else {
      this.Leledit.markAllAsTouched();
    }
  }

  imagesdeleter(index: any, first: any, last: any, len: any) {
    if (first != true || last != true) {
      this.images.splice(index, 1);
      this.tempimg.splice(index, 1);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'At least one picture is required',
      });
    }
  }

  onAttachmentChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files.length === 1) {
        const file = event.target.files[0];
        this.attachment = file;
        let url = URL.createObjectURL(file);
        this.displayattachment = this.domSanitizer.bypassSecurityTrustUrl(url);
      }
    }
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      if (filesAmount + this.images.length < 6) {
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();

          reader.onload = (event: any) => {
            this.images.push(event.target.result);

            this.Leledit.patchValue({
              fileSource: this.images,
            });
          };

          reader.readAsDataURL(event.target.files[i]);

          this.tempimg.push(event.target.files[i]);
        }
      } else {
        this.Leledit.controls['imginp'].setErrors({ incorrect: true });
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Maximum 5 pictures are allowed',
        });
      }
    }
  }

  ngOnInit(): void {
    this.get_lists();
    this.getLel();
  }
}
