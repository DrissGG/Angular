import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
})

export class NewsletterComponent implements OnInit {
  newsletterForm!: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      console.log('Email soumis :', this.newsletterForm.value.email);
    }
  }
}