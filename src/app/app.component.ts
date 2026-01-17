import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // <--- ADD THIS
import { HttpClientModule } from '@angular/common/http'; // <--- AND THIS
import { BookingService, Room } from './booking.service';

@Component({
  selector: 'app-root',
  standalone: true, // <--- ENSURE THIS IS TRUE
  imports: [CommonModule, FormsModule, HttpClientModule], // <--- ADD IMPORTS HERE
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rooms: Room[] = [];
  floors: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]; // Reverse order for display (10 on top)
  numRoomsInput: number = 1;
  message: string = '';
  lastBooked: number[] = []; // To highlight the most recent booking

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.fetchRooms();
  }

  fetchRooms() {
    this.bookingService.getRooms().subscribe(
      (response) => {
        this.rooms = response.data;
      },
      (error) => console.error('Error fetching rooms', error)
    );
  }

  book() {
    if (this.numRoomsInput < 1 || this.numRoomsInput > 5) {
      this.message = "Please enter between 1 and 5 rooms.";
      return;
    }

    this.bookingService.bookRooms(this.numRoomsInput).subscribe(
      (res) => {
        this.lastBooked = res.booked;
        this.message = `Success! Booked rooms: ${res.booked.join(', ')}`;
        this.fetchRooms();
      },
      (err) => {
        this.message = err.error.error || "Booking failed.";
      }
    );
  }

  generateRandom() {
    this.bookingService.randomize().subscribe(() => {
      this.lastBooked = []; // Clear highlight
      this.message = "Random occupancy generated.";
      this.fetchRooms();
    });
  }

  reset() {
    this.bookingService.reset().subscribe(() => {
      this.lastBooked = [];
      this.message = "All bookings reset.";
      this.fetchRooms();
    });
  }

  // Helper to get rooms for a specific floor from the flat array
  getRoomsOnFloor(floor: number): Room[] {
    return this.rooms
      .filter(r => r.floor === floor)
      .sort((a, b) => a.pos - b.pos);
  }
}