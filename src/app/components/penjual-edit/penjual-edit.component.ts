import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  SelectMultipleControlValueAccessor,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PenjualDataService } from 'src/app/_services/penjual-data.service';
PenjualDataService;
import { Seller } from '../penjual-home/penjual-home.component';

@Component({
  selector: 'app-penjual-edit',
  templateUrl: './penjual-edit.component.html',
  styleUrls: ['./penjual-edit.component.css'],
})
export class PenjualEditComponent implements OnInit {
  Selleredit: FormGroup = new FormGroup({
    selname: new FormControl(''),
    seladdr: new FormControl(''),
    selindus: new FormControl(''),
    selphone: new FormControl(''),
    selfax: new FormControl(''),
  });
  sellereditform() {
    this.Selleredit = this.fb.group({
      selname: ['', Validators.required],
      seladdr: ['', Validators.required],
      selindus: ['', Validators.required],
      selphone: [
        '',
        Validators.compose([
          Validators.pattern('^([0][8]|[+][6][2])[- +()0-9]+'),
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(14),
        ]),
      ],
      selfax: [
        '',
        Validators.compose([
          Validators.pattern('^[- +()0-9]+'),
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
        ]),
      ],
    });
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private penjualserv: PenjualDataService,
    private router: Router
  ) {
    this.sellereditform();
  }

  curseller: any = {};

  getSeller() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.penjualserv.getSellerbyId(id).subscribe((seller) => {
      this.curseller = seller;
      // console.log(seller)
    });
  }

  updateSeller(sellereditform: any) {
    if (sellereditform.valid) {
      var newsel: Seller = {
        id: this.curseller.id,
        name: sellereditform.value.selname,
        industry: sellereditform.value.selindus,
        address: sellereditform.value.seladdr,
        phoneNum: sellereditform.value.selphone,
        fax: sellereditform.value.selfax,
        dateCreated: this.curseller.dateCreated,
        dateUpdated: this.curseller.dateUpdated,
        updatedBy: this.curseller.updatedBy,
        dateDeleted: this.curseller.dateDeleted,
        deletedBy: this.curseller.deletedBy,
        isActive: this.curseller.isActive,
      };

      this.penjualserv
        .updateSeller(this.curseller.id, newsel)
        .subscribe((sel) => {
          this.router.navigate(['penjual']);
        });
    } else {
      this.Selleredit.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.getSeller();
  }
}
