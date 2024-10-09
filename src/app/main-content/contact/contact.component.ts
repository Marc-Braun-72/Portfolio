import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from './../../../app/language.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HttpClientModule]
})
export class ContactComponent implements OnInit {
  isEnglish = true;
  contactForm!: FormGroup;
  feedbackMessage: string = '';
  feedbackColor: string = '';
  isLoading: boolean = false;

  constructor(
    private languageService: LanguageService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

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
    if (this.contactForm.valid && !this.contactForm.get('honeypot')?.value) {
      this.isLoading = true;
      const formData = this.contactForm.value;

      // URL zu deinem PHP-Skript
      const url = 'https://marc-braun.com/mail.php';

      this.http.post<any>(url, formData).subscribe(
        response => {
          this.isLoading = false;
          if (response.success) {
            this.feedbackMessage = this.isEnglish
              ? 'Your message has been sent successfully!'
              : 'Deine Nachricht wurde erfolgreich gesendet!';
            this.feedbackColor = 'success';
            this.contactForm.reset();
          } else {
            this.feedbackMessage = response.message;
            this.feedbackColor = 'error';
          }
        },
        error => {
          this.isLoading = false;
          this.feedbackMessage = this.isEnglish
            ? 'There was an error sending your message. Please try again later.'
            : 'Beim Senden deiner Nachricht ist ein Fehler aufgetreten. Bitte versuche es später erneut.';
          this.feedbackColor = 'error';
        }
      );
    } else {
      this.feedbackMessage = this.isEnglish
        ? 'Please fill out the form correctly.'
        : 'Bitte fülle das Formular korrekt aus.';
      this.feedbackColor = 'error';
    }
  }

  openPrivacyPolicy(event: MouseEvent) {
    event.preventDefault(); 
    window.location.href = '/privacy-policy'; 
  }

  addRippleEffect(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
  }
}
