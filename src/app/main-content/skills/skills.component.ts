import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LanguageService } from './../../../app/language.service'; 

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, AfterViewInit {
  isEnglish = true;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.getCurrentLanguage().subscribe(lang => {
      this.isEnglish = lang === 'en';
    });
  }

  ngAfterViewInit() {
    this.animateIcons();
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

  animateIcons() {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const icons = document.querySelectorAll('.icon-item');

    gsap.set(icons, { opacity: 0, x: -100, y: 50 });

    icons.forEach((icon, index) => {
      gsap.to(icon, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: index * 0.1, 
        scrollTrigger: {
          trigger: icon,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        motionPath: {
          path: [
            { x: -100, y: 50 },
            { x: -50, y: 0 },
            { x: 0, y: 0 }
          ],
          curviness: 1.5,
          autoRotate: false
        }
      });
    });
  }
}
