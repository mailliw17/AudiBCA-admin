import { Component, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

// import Validation from './utils/validation';
import { SpinnerService } from './_services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'real-estate-admin';

  constructor(
    public spinner: SpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const rt = this.getChild(this.activatedRoute);
        rt.data.subscribe((data: { title: string }) => {
          // console.log(data);
          this.titleService.setTitle(data.title);
        });
      });
  }
}
