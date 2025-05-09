import {Component, OnDestroy, OnInit} from '@angular/core';
import {BgListComponent} from '../../../components/bg-list/bg-list.component';
import {BoardgameService} from '../../../shared/services/boardgame.service';
import {BoardGame} from '../../../shared/interfaces/boardgame.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-bg-catalog',
  standalone: true,
  imports: [BgListComponent],
  templateUrl: './bg-catalog.component.html',
})
export class BgCatalogComponent implements OnInit, OnDestroy{
  boardGames: BoardGame[] = [];
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;

  constructor(private bgService: BoardgameService) {}

  ngOnInit(): void {
    this.callApiService();

    this.loadBoardGames();

    this.subscription.add(
      this.bgService.boardgames$.subscribe(games => {
        this.boardGames = games;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private callApiService() {
    this.bgService.getBoardgame().subscribe((data) => {
      this.boardGames = data;
    });
  }

  private loadBoardGames():void {
    this.isLoading = true;
    this.bgService.getBoardgame().subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading board games:', error);
        this.isLoading = false;
      }
    });
  }

  onBookedChange(event: { boardgame: BoardGame, Booked: boolean }) {
    const index = this.boardGames.findIndex(bg => bg.id === event.boardgame.id);
    if (index !== -1) {
      this.boardGames[index].Booked = event.Booked;
    }
  }

}
