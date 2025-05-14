import {Component, computed, inject, input, output, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BoardgameService} from '../../shared/services/boardgame.service';
import {BoardGame} from '../../shared/interfaces/boardgame.interface';
import {Booking} from '../../shared/interfaces/booking.interface';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.component.html',
})
export class BookFormComponent {
  readonly #router = inject(Router);
  readonly #bgService = inject(BoardgameService);
  bg = input<BoardGame>(this.#bgService.default_bg);
  addBook = output<Booking>({alias: 'sendBooking'});
  readonly #formBuilder = inject(FormBuilder);
  message = '';

  bookForm: Signal<FormGroup> = computed(() => this.#formBuilder.group({
      Name: [{value: this.bg().name, disabled: true}],
      Designer: [{value: this.bg().designer, disabled: true}],
      Players: [{value: this.bg().players, disabled: true}],
      Playing_time: [{value: this.bg().playingTime, disabled: true}],
      Category: [{value: this.bg().categories, disabled: true}],
      loanDate: ['', Validators.required],
      loanTime: ['', Validators.required],
  }));

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  addBooking() {
    if(this.bookForm().invalid) {
      this.message = 'Please fill in all required fields.';
    } else {
      const Book: Booking = {
        id: Math.floor(Math.random() * 100) + 1,
        idBoardgame: this.bg().id,
        bgName: this.bg().name,
        idUser: 1,
        loanDate: `${this.bookForm().value.loanDate}`,
        loanTime: `${this.bookForm().value.loanTime}`
      };
      this.addBook.emit(Book);
      this.bg().Booked = true;
      this.#router.navigate(['/catalog']);
    }
  }
}
