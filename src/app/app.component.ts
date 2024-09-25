import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { ContactComponent } from "./main-content/contact/contact.component";
import { SkillsComponent } from "./main-content/skills/skills.component";
import { AboutComponent } from "./main-content/about/about.component";
import { WorkComponent } from "./main-content/work/work.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, ContactComponent, SkillsComponent, AboutComponent, WorkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
