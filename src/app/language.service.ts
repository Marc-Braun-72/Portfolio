import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language = new BehaviorSubject<string>(this.getSavedLanguage() || 'en');

  getCurrentLanguage() {
    return this.language.asObservable();
  }

  changeLanguage(lang: string) {
    this.language.next(lang);
    localStorage.setItem('language', lang);
  }

  private getSavedLanguage(): string | null {
    return localStorage.getItem('language'); 
  }
}
