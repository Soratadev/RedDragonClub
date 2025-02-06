import {Component, input} from '@angular/core';
import {BgItemComponent} from '../bg-item/bg-item.component';
import {BoardGame} from '../../shared/interfaces/boardgame.interface';
import {bookedChange} from '../../shared/interfaces/bookedChange.interface';

@Component({
  selector: 'app-bg-list',
  standalone: true,
  imports: [BgItemComponent],
  templateUrl: './bg-list.component.html',
  styleUrl: './bg-list.component.scss'
})
export class BgListComponent {
  boardgames = input.required<BoardGame[]>();

  saveBooked({boardgame, Booked}: bookedChange): void {
    boardgame.Booked = Booked;
  }

}
