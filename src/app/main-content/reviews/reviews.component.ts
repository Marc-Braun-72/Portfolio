import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, AfterViewInit {
  currentIndex = 0;
  totalItems = 3;
  isEnglish = true;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.isEnglish = lang === 'en';
    });
  }

  ngAfterViewInit() {
    const carouselContent = document.querySelector('.carousel-content') as HTMLElement;
    const dots = document.querySelectorAll('.dot') as NodeListOf<HTMLElement>;

    this.updateCarousel(carouselContent, dots);

    document.querySelector('.arrow-left')?.addEventListener('click', () => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.totalItems - 1; 
      }
      this.updateCarousel(carouselContent, dots);
    });

    document.querySelector('.arrow-right')?.addEventListener('click', () => {
      if (this.currentIndex < this.totalItems - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; 
      }
      this.updateCarousel(carouselContent, dots);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.currentIndex = index;
        this.updateCarousel(carouselContent, dots);
      });
    });
  }

  updateCarousel(carouselContent: HTMLElement, dots: NodeListOf<HTMLElement>) {
    const itemWidth = 100 / 3; 
    carouselContent.style.transform = `translateX(${-this.currentIndex * itemWidth}%)`;

    const items = document.querySelectorAll('.carousel-item');
    
    items.forEach((item, index) => {
        item.classList.toggle('active', index === this.currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  onLanguageChange() {
    this.isEnglish = !this.isEnglish;
    this.languageService.changeLanguage(this.isEnglish ? 'en' : 'de');
  }
}
