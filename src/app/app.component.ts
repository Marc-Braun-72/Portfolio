

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,  
    HeaderComponent,
    FooterComponent,
  ],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet> 
    <app-footer></app-footer>
  `
})
export class AppComponent {}
