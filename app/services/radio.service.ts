import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BroadcastProgram, Station } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class RadioService {
  private readonly stations: Station[] = [
    { name: 'Kossuth Rádió', id: 6, file: 'mr1.mp4' },
    { name: 'Petőfi Rádió', id: 21, file: 'mr2.mp4' },
    { name: 'Bartók Rádió', id: 12, file: 'mr3.mp4' },
    { name: 'Dankó Rádió', id: 9, file: 'mr7.mp4' },
    { name: 'Nemzeti Sportrádió', id: 47, file: 'mr11.mp4' },
    { name: 'Szakcsi Rádió', id: 43, file: 'mr9.mp4' },
    { name: 'Csukas Rádió', id: 50, file: 'mr10.mp4' }
  ];

  constructor(private http: HttpClient) { }

  getStations(): Station[] {
    return this.stations;
  }

  getStationById(id: number): Station | undefined {
    return this.stations.find(s => s.id === id);
  }

  getPrograms(stationId: number, date: string): Observable<BroadcastProgram[]> {
    const url = `https://mediaklikk.hu/iface/broadcast/${date}/broadcast_${stationId}.xml`;
    
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(xmlText => this.parseXmlPrograms(xmlText))
    );
  }

  private parseXmlPrograms(xmlText: string): BroadcastProgram[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const items = Array.from(xmlDoc.querySelectorAll('Item'));
    
    return items.map(item => {
      const beginDate = item.querySelector('BeginDate')?.textContent || '';
      const endDate = item.querySelector('EndDate')?.textContent || '';
      const title = item.querySelector('Title')?.textContent || 'Cím nélkül';
      
      // Convert "2026-02-15 00:00:00" format to "00:00:00" format
      const start = this.convertDateTimeToTimestamp(beginDate);
      const end = this.convertDateTimeToTimestamp(endDate);
      
      return {
        start,
        end,
        title
      };
    });
  }

  private convertDateTimeToTimestamp(dateTime: string): string {
    if (!dateTime) return '';
    
    // Extract time from "2026-02-15 00:00:00" format
    const timePart = dateTime.split(' ')[1];
    if (!timePart) return '';
    
    // Convert "00:00:00" to "00:00:00" format
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  private convertTimeToSeconds(time: string): Number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return (hours * 3600 + minutes * 60 + seconds);

  }

  getAudioUrl(stationFile: string, date: string, start: string, end: string): string {
    // Convert date from YYYY-MM-DD to YYYY/MM/DD
    const dateParts = date.split('-');
    const formattedDate = dateParts.join('/');
    // Remove leading zeros from timestamps
    const startTime = this.convertTimeToSeconds(start).toString();
    const endTime = this.convertTimeToSeconds(end).toString();
    
    const baseUrl = `https://hangtar-cdn.connectmedia.hu/hangtar/${formattedDate}/${stationFile}`;
    return `${baseUrl}?start=${startTime}&end=${endTime}`;
  }

  formatTime(timestamp: string): string {
    if (!timestamp) return '';
    const hours = timestamp.substring(0, 2);
    const minutes = timestamp.substring(2, 4);
    const seconds = timestamp.substring(4, 6);
    return `${hours}:${minutes}:${seconds}`;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
