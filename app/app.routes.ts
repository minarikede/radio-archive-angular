import { Routes } from '@angular/router';
import { StationListComponent } from './components/station-list/station-list.component';
import { ProgramListComponent } from './components/program-list/program-list.component';

export const routes: Routes = [
  { path: '', component: StationListComponent },
  { path: 'programs/:id', component: ProgramListComponent },
  { path: '**', redirectTo: '' }
];
