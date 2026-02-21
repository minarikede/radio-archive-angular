import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RadioService } from '../../services/radio.service';
import { Station } from '../../models/station.model';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {
  stations: Station[] = [];

  constructor(
    private radioService: RadioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stations = this.radioService.getStations();
  }

  selectStation(stationId: number): void {
    this.router.navigate(['/programs', stationId]);
  }
}
