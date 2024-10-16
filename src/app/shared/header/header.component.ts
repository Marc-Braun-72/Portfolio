import { Component, OnInit, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { LanguageService } from '../../language.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  @ViewChild('headerMenu', { static: false }) headerMenu!: ElementRef;

  isEnglish = true;
  menuOpen = false;
  activeSection: string = '';

  sections: { id: string, label: string }[] = [
    { id: 'about', label: 'About me' },
    { id: 'skills', label: 'Skills' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ];

  constructor(private languageService: LanguageService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.isEnglish = lang === 'en';
    });
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
    this.toggleOverlay(this.menuOpen);
    
    if (this.menuOpen) {
      this.addDocumentClickListener();
      setTimeout(() => {
        document.addEventListener('click', this.onDocumentClick.bind(this), { once: true });
      }, 0);
    }
  }
  
  
  closeMenu() {
    this.menuOpen = false;
    this.toggleOverlay(false);
    this.cdr.detectChanges();
  }
  
  toggleOverlay(show: boolean) {
    const overlay = document.querySelector('.overlay') as HTMLElement;
    overlay.style.display = show ? 'block' : 'none';
  }  
  
  onLanguageChange() {
    this.isEnglish = !this.isEnglish;
    this.languageService.changeLanguage(this.isEnglish ? 'en' : 'de');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.menuOpen && this.headerMenu && !this.headerMenu.nativeElement.contains(event.target)) {
      this.closeMenu();
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
      
      if (rect && rect.top < window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4) {
        this.activeSection = section.id;
        sectionFound = true;
      }
    });
  
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

  navigateAndScroll(route: string) {
    this.router.navigate([route]).then(() => this.scrollToTop());
  }

  addDocumentClickListener() {
    document.addEventListener('click', this.onDocumentClick.bind(this), { once: true });
  }
  
}
