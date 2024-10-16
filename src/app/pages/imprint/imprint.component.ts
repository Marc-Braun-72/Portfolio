import { Component } from '@angular/core';
import { LanguageService } from './../../../app/language.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
})
export class ImprintComponent {
  isEnglish = true;

  constructor(private languageService: LanguageService) {
    this.languageService.getCurrentLanguage().subscribe((lang) => {
      this.isEnglish = lang === 'en';
    });
  }

  onLanguageChange() {
    this.isEnglish = !this.isEnglish;
    this.languageService.changeLanguage(this.isEnglish ? 'en' : 'de');
  }
}
