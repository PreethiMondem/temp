import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  book = {};
  bookForm: FormGroup;
  isbn: string = '';
  title: string = '';
  description: string = '';
  author: string = '';
  publisher: string = '';
  published_year: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
    this.bookForm = this.formBuilder.group({
      'isbn': ['' , Validators.required],
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'author': ['', Validators.required],
      'publisher': ['', Validators.required],
      'published_year': ['', Validators.required]
    });

  }

  getBook(id) {
    this.api.getBook(id)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateBook(this.route.snapshot.params['id'], form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
  }

}
