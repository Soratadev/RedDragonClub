import {Component, computed, input, output} from '@angular/core';
import { BoardGame } from '../../shared/interfaces/boardgame.interface';
import { bookedChange } from '../../shared/interfaces/bookedChange.interface';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-bg-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bg-item.component.html',
  styleUrl: './bg-item.component.scss'
})
export class BgItemComponent {
  boardgame = input.required<BoardGame>();
  bookedChange = output<bookedChange>();

  isBooked = computed(() => this.boardgame().Booked);

  get boardgameAttributes() {
    const bg = this.boardgame();
    return [
      { key: 'title', label: 'Title', value: bg.Name },
      { key: 'designer', label: 'Designer', value: bg.Designer },
      { key: 'players', label: 'Players', value: bg.Players },
      { key: 'playing-time', label: 'Playing time', value: bg.Playing_time },
      { key: 'category', label: 'Category', value: bg.Category },
      { key: 'complexity', label: 'Complexity (out of 5)', value: bg.Complexity },
      { key: 'age', label: 'Age', value: bg.Age },
      { key: 'description', label: 'Description', value: bg.Description }
    ];
  }

  /*toggleBooking() {
    this.boardgame().Booked = !this.boardgame().Booked;
  }*/
  toggleBooking() {
    this.bookedChange.emit({boardgame: this.boardgame(), Booked: !this.boardgame().Booked});
  }
}
