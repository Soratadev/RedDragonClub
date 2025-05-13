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
  templateUrl: './bg-booking.component.html',
})
export class BgBookingComponent {
  readonly #router = inject(Router);
  readonly #activatedRouter = inject(ActivatedRoute);
  readonly #bookingService = inject(BookingService);

  bg: BoardGame = this.#activatedRouter.snapshot.data['bg'];

  addBook(book: Booking) {
    try {
      this.#bookingService.add(book);
      this.#router.navigate(['/public/catalog']);
    } catch (error) {
      console.error('Error adding reservation:', error);

    }
  }

}
