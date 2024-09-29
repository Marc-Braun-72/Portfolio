import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements AfterViewInit {
  currentIndex = 0;
  totalItems = 3;

  
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

    carouselContent.style.transform = `translateX(${-this.currentIndex * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
}