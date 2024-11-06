import { Routes } from '@angular/router';
import { HologramTableComponent } from './features/holograms/hologram-table/hologram-table.component';
import { HologramFormComponent } from './features/holograms/hologram-form/hologram-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'holograms', pathMatch: 'full' },
  { path: 'holograms', component: HologramTableComponent },
  { path: 'holograms/create', component: HologramFormComponent },
  { path: 'holograms/edit/:id', component: HologramFormComponent },
];
