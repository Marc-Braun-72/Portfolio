import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importiere Router für die Navigation

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {} // Füge Router zum Constructor hinzu

  ngOnInit() {
    this.contactForm = this.fb.group({
      honeypot: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      privacyPolicy: [false, Validators.requiredTrue]
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

  // Neue Methode für den Privacy Policy Link
  openPrivacyPolicy(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    // Hier die Navigation zur Datenschutzerklärung
    this.router.navigate(['/privacy-policy']);
  }
}