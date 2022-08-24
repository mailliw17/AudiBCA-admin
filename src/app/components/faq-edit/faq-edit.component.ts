import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FAQDataService } from 'src/app/_services/faqdata.service';
import { FAQ } from '../faq-home/faq-home.component';

@Component({
  selector: 'app-faq-edit',
  templateUrl: './faq-edit.component.html',
  styleUrls: ['./faq-edit.component.css']
})
export class FaqEditComponent implements OnInit {
  FAQedit: FormGroup= new FormGroup({
    faqq: new FormControl(''),
    faqa: new FormControl(''),
  });
  faqeditform(){
    this.FAQedit = this.fb.group({
      faqq:['', Validators.required],
      faqa:['',Validators.required]
    })
    
  }
  curfaq: any = {};
  constructor(private route: ActivatedRoute, private faqserv: FAQDataService, private router: Router,private fb:FormBuilder) 
  { this.faqeditform(); }

  getFAQ() {
    const id = String(this.route.snapshot.paramMap.get('id'))
    this.faqserv.getFAQId(id).subscribe(faq => {
      this.curfaq = faq;
    })
  }
  ngOnInit(): void {
    this.getFAQ();
  }
  updateFAQ(faqform:any) {
    if (faqform.valid){
    var updatedfaq: FAQ = {
      id: this.curfaq.id,
      question: faqform.value.faqq,
      answer: faqform.value.faqa,
      dateCreated: this.curfaq.dateCreated,
      createdBy: this.curfaq.createdBy,
      dateUpdated: this.curfaq.dateUpdated,
      updatedBy: this.curfaq.updatedBy,
      dateDeleted: this.curfaq.dateDeleted,
      deletedBy: this.curfaq.deletedBy,
      isActive: this.curfaq.isActive
    }

    this.faqserv.updateFAQ(this.curfaq.id, updatedfaq)
      .subscribe(
        faq => {
          this.curfaq = faq
          this.router.navigate(['faq'])
        })
    }
    else{
     this.FAQedit.markAllAsTouched();
    }
  }

}
