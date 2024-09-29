
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule und CommonModule
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      honeypot: [''], // Honeypot-Feld (wird unsichtbar gemacht)
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      privacyPolicy: [false, Validators.requiredTrue] // Checkbox muss angeklickt sein
    });
  }

  onSubmit() {
    if (this.contactForm.valid && !this.contactForm.get('honeypot')?.value) {
      console.log('Form Submitted', this.contactForm.value);
      // Hier kannst du den Versandprozess einleiten
    } else {
      console.log('Spam detected or form is invalid');
    }
  }
}

