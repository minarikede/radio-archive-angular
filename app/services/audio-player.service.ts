import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PlayerState {
  isActive: boolean;
  title: string;
  time: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private playerStateSubject = new BehaviorSubject<PlayerState>({
    isActive: false,
    title: '-',
    time: '-',
    url: ''
  });

  playerState$ = this.playerStateSubject.asObservable();

  play(title: string, time: string, url: string): void {
    this.playerStateSubject.next({
      isActive: true,
      title,
      time,
      url
    });
  }

  close(): void {
    this.playerStateSubject.next({
      isActive: false,
      title: '-',
      time: '-',
      url: ''
    });
  }

  getCurrentUrl(): string {
    return this.playerStateSubject.value.url;
  }
}
