import {Component, inject, input, OnInit, output} from '@angular/core';
import { BoardGame } from '../../shared/interfaces/boardgame.interface';
import { bookedChange } from '../../shared/interfaces/bookedChange.interface';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {combineLatest, distinctUntilChanged, Subscription} from 'rxjs';

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
  readonly #userService = inject(UserService);
  private subscription = new Subscription();

  isLogged = false;
  isAdmin = false;

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.#userService.getLoginStatus$(),
        this.#userService.getUserRole$()
      ]).pipe(distinctUntilChanged()) // Asegura que solo nuevos valores únicos disparen eventos
        .subscribe(([isLogged, role]) => {
          this.isLogged = isLogged;
          this.isAdmin = role === 'ROLE_ADMIN'; // Configura si el usuario es admin
        })
    );

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
