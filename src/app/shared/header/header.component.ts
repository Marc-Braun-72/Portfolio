import { Component, OnInit, HostListener } from '@angular/core';
import { LanguageService } from './../../../app/language.servise'; // Pfad anpassen

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  isEnglish = false;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.isEnglish = lang === 'en';
    });
  }

  onLanguageChange() {
    this.isEnglish = !this.isEnglish;
    this.languageService.changeLanguage(this.isEnglish ? 'en' : 'de');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('header');
    if (window.pageYOffset > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }
}