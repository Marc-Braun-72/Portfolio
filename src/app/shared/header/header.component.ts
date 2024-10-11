import { Component, OnInit, HostListener } from '@angular/core';
import { LanguageService } from '../../language.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  isEnglish = true;

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu() {
    this.menuOpen = false;
  }
  

  @HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const clickedInside = (event.target as HTMLElement).closest('.header_content');
  if (!clickedInside && this.menuOpen) {
    this.menuOpen = false;
  }
}


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
