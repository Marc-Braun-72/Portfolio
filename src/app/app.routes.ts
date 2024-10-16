// app.routes.ts
import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent, pathMatch: 'full' },  
  { path: 'imprint', component: ImprintComponent, pathMatch: 'full' }, 
  { path: 'privacy-policy', component: PrivacyPolicyComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
