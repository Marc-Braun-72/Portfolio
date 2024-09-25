import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  texts: { [key: string]: { button: string; header: string } } = {
    en: {
      button: "Let's talk!",
      header: "Welcome"
    },
    de: {
      button: "Lass uns reden!",
      header: "Willkommen"
    }
  };

  currentLanguage = 'en';

  changeLanguage(language: string): void {
    this.currentLanguage = language;
  }

  get buttonText(): string {
    return this.texts[this.currentLanguage].button;
  }

  get headerText(): string {
    return this.texts[this.currentLanguage].header;
  }
}