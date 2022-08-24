import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getMatIconNoHttpProviderError } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BranchDataService } from 'src/app/_services/branch-data.service';
import { Branch } from '../cabang-penjual-home/cabang-penjual-home.component';
import { Seller } from '../penjual-home/penjual-home.component';
@Component({
  selector: 'app-cabang-penjual-tambah',
  templateUrl: './cabang-penjual-tambah.component.html',
  styleUrls: ['./cabang-penjual-tambah.component.css'],
})
export class CabangPenjualTambahComponent implements OnInit {
  Branchadd: FormGroup = new FormGroup({
    branchname: new FormControl(''),
    branchaddr: new FormControl(''),
    branchinitial: new FormControl(''),
    branchseller: new FormControl(''),
    branchprovince: new FormControl(''),
    branchtype: new FormControl(''),
  });

  branchaddform() {
    this.Branchadd = this.fb.group({
      branchname: ['', Validators.required],
      branchaddr: ['', Validators.required],
      branchinitial: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Z ]+'),
          Validators.maxLength(3),
          Validators.minLength(3),
        ]),
      ],
      branchseller: ['', Validators.required],
      branchprovince: ['', Validators.required],
      branchtype: ['', Validators.required],
    });
  }

  constructor(
    private fb: FormBuilder,
    private branchserv: BranchDataService,
    private router: Router
  ) {
    this.branchaddform();
  }
  prov_array: any[] = [];
  seller_array: Seller[] = [];
  getProv() {
    this.branchserv.getProvince().subscribe((prov) => {
      // console.log(prov)
      this.prov_array = prov;
    });
  }
  getSeller() {
    this.branchserv.getSellers().subscribe((sellers) => {
      var s: any = sellers;
      this.seller_array = s.content;
    });
  }

  add(branchaddform: any) {
    if (branchaddform.valid) {
      var newbranch: Branch = {
        id: '',
        name: branchaddform.value.branchname,
        type: branchaddform.value.branchtype,
        address: branchaddform.value.branchaddr,
        province: branchaddform.value.branchprovince.name,
        initial: branchaddform.value.branchinitial,
        seller: branchaddform.value.branchseller.id,
        dateCreated: '',
        createdBy: '',
        dateUpdated: '',
        updatedBy: '',
        dateDeleted: '',
        deletedBy: '',
        isActive: true,
      };

      this.branchserv.createBranch(newbranch).subscribe((branch) => {
        newbranch = branch;
        this.router.navigate(['cabang-penjual']);
      });
    } else {
      this.Branchadd.markAllAsTouched();
    }
  }
  ngOnInit(): void {
    this.getSeller();
    this.getProv();
  }
}
