// src/app/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
require('dotenv').config();

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
  private apiUrl = process.env.BACKEND_URL || 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getRooms(): Observable<{ data: Room[] }> {
    return this.http.get<{ data: Room[] }>(`${this.apiUrl}/rooms`);
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