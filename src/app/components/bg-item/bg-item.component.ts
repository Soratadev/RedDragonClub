import {Component, computed, input, output} from '@angular/core';
import { BoardGame } from '../../shared/interfaces/boardgame.interface';
import { bookedChange } from '../../shared/interfaces/bookedChange.interface';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-bg-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bg-item.component.html',
})
export class BgItemComponent {
  boardgame = input.required<BoardGame>();
  bookedChange = output<bookedChange>();

  isBooked = computed(() => this.boardgame().Booked);

  get boardgameAttributes() {
    const bg = this.boardgame();
    let categories = "";
    bg.categories.forEach((bg)=>{
      categories+=bg.name+", ";
    });
    categories=categories.slice(0, -2);

    return [
      { key: 'name', label: 'Name', value: bg.name },
      { key: 'designer', label: 'Designer', value: bg.designer },
      { key: 'players', label: 'Players', value: bg.players },
      { key: 'playing-time', label: 'Playing time', value: bg.playingTime },
      { key: 'category', label: 'Category', value: categories },
      { key: 'complexity', label: 'Complexity (out of 5)', value: bg.complexity },
      { key: 'age', label: 'Age', value: bg.age },
      { key: 'description', label: 'Description', value: bg.description }
    ];
  }
  toggleBooking() {
    this.bookedChange.emit({boardgame: this.boardgame(), Booked: !this.boardgame().Booked});
  }
}
