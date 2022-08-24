import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchDataService } from 'src/app/_services/branch-data.service';
import { Branch } from '../cabang-penjual-home/cabang-penjual-home.component';
import { Seller } from '../penjual-home/penjual-home.component';
@Component({
  selector: 'app-cabang-penjual-edit',
  templateUrl: './cabang-penjual-edit.component.html',
  styleUrls: ['./cabang-penjual-edit.component.css']
})
export class CabangPenjualEditComponent implements OnInit {
  Branchedit: FormGroup= new FormGroup({
    branchname: new FormControl(''),
    branchaddr: new FormControl(''),
    branchinitial: new FormControl(''),
    branchseller: new FormControl(''),
    branchprovince: new FormControl(''),
    branchtype: new FormControl(''),
  });
  branchaddform(){
    this.Branchedit = this.fb.group({
      branchname:['', Validators.required],
      branchaddr:['',Validators.required],
      branchinitial:['',Validators.compose([ Validators.required,Validators.pattern("[A-Z ]+"), Validators.maxLength(3), Validators.minLength(3)])],
      branchseller:['',Validators.required],
      branchprovince:['',Validators.required],
      branchtype:['',Validators.required]
    })
  }
  
  curbranch: any = {};
  curseller: any = {};
  prov_array: any[] = [];
  seller_array: Seller[] = [];
  constructor(private fb:FormBuilder,private route: ActivatedRoute, private branchserv: BranchDataService, private router: Router) 
  { this.branchaddform();}

  getSeller() {
    this.branchserv.getSellers().subscribe(sellers => {
      var s: any = sellers
      this.seller_array = s.content
    })
  }
  getProv() {
    this.branchserv.getProvince().subscribe(prov => {
      
      this.prov_array = prov
    })
  }
  updateBranch(branchform:any) {
   
    if (branchform.valid){
      
      var newbranch: Branch = {
        id: this.curbranch.id,
        name: branchform.value.branchname,
        type: branchform.value.branchtype,
        address: branchform.value.branchaddr,
        province: branchform.value.branchprovince.name,
        initial: branchform.value.branchinitial,
        seller: branchform.value.branchseller.id,
        dateCreated: this.curbranch.dateCreated,
        createdBy: this.curbranch.createdBy,
        dateUpdated: this.curbranch.dateUpdated,
        updatedBy: this.curbranch.updatedBy,
        dateDeleted: this.curbranch.dateDeleted,
        deletedBy: this.curbranch.deletedBy,
        isActive: true
      }
      if (newbranch.seller === undefined){
        newbranch.seller = this.curseller.id
      }
      if (newbranch.province === undefined){
        newbranch.province = this.curbranch.province
      }
      
      this.branchserv.updateBranch(this.curbranch.id, newbranch)
        .subscribe(branch => {
          this.curbranch = branch,
            this.router.navigate(['cabang-penjual'])
        })
    }
    else{
      this.Branchedit.markAllAsTouched();
    }
  }



  getBranch() {
    
    const id = String(this.route.snapshot.paramMap.get('id'))
    this.branchserv.getBranchbyId(id).subscribe(branch => {
      this.curbranch = branch;
      
      this.branchserv.getSellerId(this.curbranch.seller).subscribe(seller => {
        this.curseller = seller
        this.Branchedit.setValue({
          branchname: this.curbranch.name,
          branchaddr: this.curbranch.address,
          branchinitial: this.curbranch.initial,
          branchseller: this.curseller.id,
          branchprovince: this.curbranch.province,
          branchtype: this.curbranch.type,
        })
      })

    })

  }
  ngOnInit(): void {
    
    this.getProv();
    this.getSeller();
    this.getBranch();
  }

}
