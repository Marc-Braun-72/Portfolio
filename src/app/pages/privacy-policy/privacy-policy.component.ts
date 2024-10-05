import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './../../../app/language.service'; 

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent {
  isEnglish = true;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.getCurrentLanguage().subscribe((lang) => {
      this.isEnglish = lang === 'en';
    });
  }

  onLanguageChange() {
    this.isEnglish = !this.isEnglish;
    this.languageService.changeLanguage(this.isEnglish ? 'en' : 'de');
  }
}
