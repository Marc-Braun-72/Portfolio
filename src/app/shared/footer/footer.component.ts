import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number;
  isEnglish: boolean = true;

  constructor(private languageService: LanguageService) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.isEnglish = lang === 'en';
    });
  }
}
