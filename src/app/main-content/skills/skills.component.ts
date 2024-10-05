import { Component, OnInit } from '@angular/core';
import { LanguageService } from './../../../app/language.service'; 

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  isEnglish = true;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Holt die aktuelle Sprache aus dem LanguageService
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.isEnglish = lang === 'en';
    });
  }

  onLanguageChange() {
    // Wechselt die Sprache und aktualisiert die Anzeige
    this.isEnglish = !this.isEnglish;
    this.languageService.changeLanguage(this.isEnglish ? 'en' : 'de');
  }

  addRippleEffect(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement; 
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }
}
