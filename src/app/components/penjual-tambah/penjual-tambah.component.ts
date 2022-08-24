import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PenjualDataService } from 'src/app/_services/penjual-data.service';
PenjualDataService;
import { Seller } from '../penjual-home/penjual-home.component';

@Component({
  selector: 'app-penjual-tambah',
  templateUrl: './penjual-tambah.component.html',
  styleUrls: ['./penjual-tambah.component.css'],
})
export class PenjualTambahComponent implements OnInit {
  Selleradd: FormGroup = new FormGroup({
    selname: new FormControl(''),
    seladdr: new FormControl(''),
    selindus: new FormControl(''),
    selphone: new FormControl(''),
    selfax: new FormControl(''),
  });

  selleraddform() {
    this.Selleradd = this.fb.group({
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
          Validators.pattern('^[+][- +()0-9]+'),
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
        ]),
      ],
    });
  }

  constructor(
    private fb: FormBuilder,
    private selserv: PenjualDataService,
    private router: Router
  ) {
    this.selleraddform();
  }

  add(seladdform: any) {
    if (seladdform.valid) {
      var x: Seller = {
        id: 'string',
        name: seladdform.value.selname,
        industry: seladdform.value.selindus,
        address: seladdform.value.seladdr,
        phoneNum: seladdform.value.selphone,
        fax: seladdform.value.selfax,
        dateCreated: 'string',
        dateUpdated: 'string',
        updatedBy: 'string',
        dateDeleted: 'string',
        deletedBy: 'string',
        isActive: true,
      };

      this.selserv.createSeller(x).subscribe((sel) => {
        // console.log(sel)
        this.router.navigate(['penjual']);
      });
    } else {
      this.Selleradd.markAllAsTouched();
    }
  }

  ngOnInit(): void {}
}
