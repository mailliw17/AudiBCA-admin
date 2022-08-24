import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FAQDataService } from 'src/app/_services/faqdata.service';
import { FAQ } from '../faq-home/faq-home.component';

@Component({
  selector: 'app-faq-tambah',
  templateUrl: './faq-tambah.component.html',
  styleUrls: ['./faq-tambah.component.css'],
})
export class FaqTambahComponent implements OnInit {
  FAQadd: FormGroup = new FormGroup({
    faqq: new FormControl(''),
    faqa: new FormControl(''),
  });
  faqaddform() {
    this.FAQadd = this.fb.group({
      faqq: ['', Validators.required],
      faqa: ['', Validators.required],
    });
  }

  constructor(
    private fb: FormBuilder,
    private faqserv: FAQDataService,
    private router: Router
  ) {
    this.faqaddform();
  }

  add(faqform: any) {
    if (faqform.valid) {
      var temp: any = faqform.value;
      // console.log(temp)
      // console.log(faqform.value.faqq)
      var newfaq: FAQ = {
        id: '',
        question: faqform.value.faqq,
        answer: temp.faqa,
        dateCreated: '',
        createdBy: '',
        dateUpdated: '',
        updatedBy: '',
        dateDeleted: '',
        deletedBy: '',
        isActive: true,
      };

      this.faqserv.createFAQ(newfaq).subscribe((faq) => {
        newfaq = faq;
        this.router.navigate(['faq']);
      });
    } else {
      this.FAQadd.markAllAsTouched();
    }
  }

  ngOnInit(): void {}
}
