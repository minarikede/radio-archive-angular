import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RadioService } from '../../services/radio.service';
import { AudioPlayerService } from '../../services/audio-player.service';
import { Station, BroadcastProgram } from '../../models/station.model';

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {
  station?: Station;
  programs: BroadcastProgram[] = [];
  selectedDate: string = '';
  maxDate: string = '';
  loading: boolean = false;
  error: string = '';
  currentPlayingUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private radioService: RadioService,
    private audioPlayerService: AudioPlayerService
  ) {}

  ngOnInit(): void {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.maxDate = this.radioService.formatDate(yesterday);
    this.selectedDate = this.maxDate;

    this.route.params.subscribe(params => {
      const stationId = Number(params['id']);
      this.station = this.radioService.getStationById(stationId);
      
      if (this.station) {
        this.loadPrograms();
      }
    });

    // Subscribe to player state to track currently playing
    this.audioPlayerService.playerState$.subscribe(state => {
      this.currentPlayingUrl = state.url;
    });
  }

  loadPrograms(): void {
    if (!this.station) return;

    this.loading = true;
    this.error = '';
    this.programs = [];

    this.radioService.getPrograms(this.station.id, this.selectedDate).subscribe({
      next: (programs) => {
        this.programs = programs;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Nem sikerült betölteni a műsorokat';
        this.loading = false;
        console.error('Error loading programs:', err);
      }
    });
  }

  onDateChange(): void {
    this.loadPrograms();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  formatTime(timestamp: string): string {
    return this.radioService.formatTime(timestamp);
  }

  getAudioUrl(program: BroadcastProgram): string {
    if (!this.station) return '';
    return this.radioService.getAudioUrl(
      this.station.file,
      this.selectedDate,
      program.start,
      program.end
    );
  }

  playProgram(program: BroadcastProgram): void {
    if (!this.station) return;
    
    const url = this.getAudioUrl(program);
    const timeRange = `${this.formatTime(program.start)} - ${this.formatTime(program.end)}`;
    const fullTime = `${this.station.name} • ${timeRange}`;
    
    this.audioPlayerService.play(program.title, fullTime, url);
  }

  isPlaying(program: BroadcastProgram): boolean {
    return this.currentPlayingUrl === this.getAudioUrl(program);
  }

  downloadProgram(program: BroadcastProgram): void {
    if (!this.station) return;
    
    const url = this.getAudioUrl(program);
    const fileName = `${this.station.name}_${this.selectedDate}_${this.formatTime(program.start)}-${this.formatTime(program.end)}.mp4`;
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
