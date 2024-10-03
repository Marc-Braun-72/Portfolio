import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language = new BehaviorSubject<string>('de'); // Standardmäßig Deutsch

  getCurrentLanguage() {
    return this.language.asObservable();
  }

  changeLanguage(lang: string) {
    this.language.next(lang);
  }
}