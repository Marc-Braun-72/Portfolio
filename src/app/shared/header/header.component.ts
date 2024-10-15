import { Component, OnInit, HostListener } from '@angular/core';
import { LanguageService } from '../../language.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true
})
export class HeaderComponent implements OnInit {
  isEnglish = true;
  menuOpen = false;
  activeSection: string = '';

  sections: { id: string, label: string }[] = [
    { id: 'about', label: 'About me' },
    { id: 'skills', label: 'Skills' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ];

  constructor(private languageService: LanguageService, private router: Router) {}

  ngOnInit() {
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.isEnglish = lang === 'en';
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  onLanguageChange() {
    this.isEnglish = !this.isEnglish;
    this.languageService.changeLanguage(this.isEnglish ? 'en' : 'de');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.header_content');
    if (!clickedInside && this.menuOpen) {
      this.menuOpen = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('header');
    if (window.pageYOffset > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    this.updateActiveSection();
  }

  updateActiveSection() {
    let sectionFound = false;
  
    this.sections.forEach(section => {
      const element = document.getElementById(section.id);
      const rect = element?.getBoundingClientRect();
      
      // Passen den tolerierten sichtbaren Bereich an
      if (rect && rect.top < window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4) {
        this.activeSection = section.id;
        sectionFound = true;
      }
    });
  
    // Entfernt die Markierung nur dann, wenn keine Sektion gefunden wurde und die Seite ganz oben ist
    if (!sectionFound && window.pageYOffset < 200) {
      this.activeSection = '';
    }
  }
  

  isActive(id: string): boolean {
    return this.activeSection === id;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
