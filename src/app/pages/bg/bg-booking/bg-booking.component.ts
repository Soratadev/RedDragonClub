import { Component, inject } from '@angular/core';
import {BookFormComponent} from '../../../components/book-form/book-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardGame} from '../../../shared/interfaces/boardgame.interface';
import {BookingService} from '../../../shared/services/booking.service';
import {Booking} from '../../../shared/interfaces/booking.interface';

@Component({
  selector: 'app-bg-booking',
  imports: [BookFormComponent],
  standalone: true,
  template:
    `<div class="flex flex-col p-12">
        <h2 class="rounded bg-orange-300 p-2 w-72 border border-gray-950 text-center font-bold">BOOKING A BOARD GAME</h2>
        <app-book-form [bg]="bg" (sendBooking)="addBook($event)"/>
    </div>`,
})
export class BgBookingComponent {
  readonly #router = inject(Router);
  readonly #activatedRouter = inject(ActivatedRoute);
  readonly #bookingService = inject(BookingService);

  bg: BoardGame = this.#activatedRouter.snapshot.data['bg'];

  addBook(book: Booking) {
    try {
      this.#bookingService.add(book);
      this.#router.navigate(['/bg/catalog']);
    } catch (error) {
      console.error('Error adding reservation:', error);

    }
  }

}
