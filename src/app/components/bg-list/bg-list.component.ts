import {Component, input} from '@angular/core';
import {BgItemComponent} from '../bg-item/bg-item.component';
import {BoardGame} from '../../shared/interfaces/boardgame.interface';
import {bookedChange} from '../../shared/interfaces/bookedChange.interface';

@Component({
  selector: 'app-bg-list',
  standalone: true,
  imports: [BgItemComponent],
  templateUrl: './bg-list.component.html',
})
export class BgListComponent {
  boardgames = input.required<BoardGame[]>();

  saveBooked({boardgame, Booked}: bookedChange): void {
    boardgame.Booked = Booked;
  }

  //video 8, no termina de convencerme el llevarme el metodo saveBooked a un servicio. Revisar más adelante.

}
