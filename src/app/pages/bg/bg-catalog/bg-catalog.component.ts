import {Component, OnInit} from '@angular/core';
import {BgListComponent} from '../../../components/bg-list/bg-list.component';
import {BoardgameService} from '../../../shared/services/boardgame.service';
import {BoardGame} from '../../../shared/interfaces/boardgame.interface';

@Component({
  selector: 'app-bg-catalog',
  standalone: true,
  imports: [BgListComponent],
  template: `<app-bg-list [boardgames]="boardGames" />`,
})
export class BgCatalogComponent implements OnInit{

  boardGames: BoardGame[] = [];
  constructor(private bgService: BoardgameService) {}

  ngOnInit(): void {
    this.callApiService();
  }

  private callApiService() {
    this.bgService.getBoardgame().subscribe((data) => {
      this.boardGames = data;
    });
  }

  onBookedChange(event: { boardgame: BoardGame, Booked: boolean }) {
    const index = this.boardGames.findIndex(bg => bg.id === event.boardgame.id);
    if (index !== -1) {
      this.boardGames[index].Booked = event.Booked;
    }
  }

}
