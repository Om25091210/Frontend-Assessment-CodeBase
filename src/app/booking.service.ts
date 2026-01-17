// src/app/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
export interface Room {
  number: number;
  floor: number;
  pos: number;
  is_occupied: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // Ensure this matches your Node backend URL
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRooms(): Observable<{ data: Room[] }> {
    // Appending a random timestamp to force a fresh fetch every time
    return this.http.get<{ data: Room[] }>(`${this.apiUrl}/rooms?_t=${Date.now()}`);
  }

  bookRooms(numRooms: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, { numRooms });
  }

  randomize(): Observable<any> {
    return this.http.post(`${this.apiUrl}/random`, {});
  }

  reset(): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset`, {});
  }
}