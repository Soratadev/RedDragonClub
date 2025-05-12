import {Component, inject, input, OnInit, output} from '@angular/core';
import { BoardGame } from '../../shared/interfaces/boardgame.interface';
import { bookedChange } from '../../shared/interfaces/bookedChange.interface';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-bg-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bg-item.component.html',
})
export class BgItemComponent implements OnInit{
  boardgame = input.required<BoardGame>();
  bookedChange = output<bookedChange>();
  deleteBg = output<number>();
  //isBooked = computed(() => this.boardgame().Booked);
  readonly #userService = inject(UserService);

  isLogged = false;
  isAdmin = false;

  ngOnInit(): void {
    this.#userService.getLoginStatus$().subscribe(status => {
      this.isLogged = status;
    });
    this.#userService.getUserRole$().subscribe(role => {
      this.isAdmin = role === 'ROLE_ADMIN';
    });

  }

  onDelete(): void {
    if (confirm(`Are you sure you want to delete "${this.boardgame().name}"?`)) {
      this.deleteBg.emit(this.boardgame().id);
    }

  }

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
