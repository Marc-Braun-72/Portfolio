import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../language.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ RouterModule ], 
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number;
  isEnglish: boolean = true;

  constructor(private languageService: LanguageService, private router: Router) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.isEnglish = lang === 'en';
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateAndScroll(route: string) {
    this.router.navigate([route]).then(() => this.scrollToTop());
  }
  
}
