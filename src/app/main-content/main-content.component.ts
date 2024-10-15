import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';  
import { AboutComponent } from '../main-content/about/about.component';
import { SkillsComponent } from '../main-content/skills/skills.component';
import { WorkComponent } from '../main-content/work/work.component';
import { ReviewsComponent } from '../main-content/reviews/reviews.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [AboutComponent, SkillsComponent, WorkComponent, ContactComponent, HeroComponent, ReviewsComponent, RouterModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
