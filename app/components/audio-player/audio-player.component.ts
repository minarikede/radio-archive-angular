import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerService, PlayerState } from '../../services/audio-player.service';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  
  playerState: PlayerState = {
    isActive: false,
    title: '-',
    time: '-',
    url: ''
  };

  constructor(private audioPlayerService: AudioPlayerService) {}

  ngOnInit(): void {
    this.audioPlayerService.playerState$.subscribe(state => {
      this.playerState = state;
      
      if (state.isActive && state.url) {
        setTimeout(() => {
          this.loadAndPlay(state.url);
        }, 0);
      } else if (!state.isActive) {
        this.pause();
      }
    });
  }

  private loadAndPlay(url: string): void {
    if (this.audioElement) {
      const audio = this.audioElement.nativeElement;
      audio.src = url;
      audio.load();
      audio.play().catch(err => {
        console.error('Error playing audio:', err);
      });
    }
  }

  private pause(): void {
    if (this.audioElement) {
      this.audioElement.nativeElement.pause();
    }
  }

  close(): void {
    this.audioPlayerService.close();
  }
}
