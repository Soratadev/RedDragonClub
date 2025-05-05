import { Injectable } from '@angular/core';
import {Booking} from '../interfaces/booking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private booking: Booking[] = [];

  add(booking: Booking): void {
    this.booking.push(booking);
  }
  update(edited_booking: Booking): void {
    this.booking = this.booking.map(book =>
      book.id === edited_booking.id ? edited_booking : book);
  }
  delete(_book: Booking): void{
    const index = this.booking.findIndex((book) => book.id === _book.id);
    if (index !== -1) {
      this.booking.splice(index, 1);
    }
  }
  findAll(): Booking[] {
    return this.booking;
  }
  findById(id: number): Booking | undefined {
    return this.booking.find(book => book.id === id);
  }
}
