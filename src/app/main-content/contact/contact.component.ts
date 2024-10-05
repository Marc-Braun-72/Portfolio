import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from './../../../app/language.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class ContactComponent implements OnInit {
  isEnglish = true;
  contactForm!: FormGroup;

  constructor(private languageService: LanguageService, private fb: FormBuilder) {}

  ngOnInit() {
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.isEnglish = lang === 'en';
    });

    this.contactForm = this.fb.group({
      honeypot: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      privacyPolicy: [false, Validators.requiredTrue] 
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
    }
  }

  openPrivacyPolicy(event: MouseEvent) {
    event.preventDefault(); 
    window.location.href = '/privacy-policy'; 
  }

}
