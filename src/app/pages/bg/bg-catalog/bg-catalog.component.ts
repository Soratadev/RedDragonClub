import {Component, inject, OnDestroy, OnInit} from '@angular/core';
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
  readonly #bgService = inject(BoardgameService);
  boardGames: BoardGame[] = [];
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;

  ngOnInit(): void {
    this.callApiService();

    this.loadBoardGames();

    this.subscription.add(
      this.#bgService.boardgames$.subscribe(games => {
        this.boardGames = games;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private callApiService() {
    this.#bgService.getBoardgame().subscribe((data) => {
      this.boardGames = data;
    });
  }

  private loadBoardGames():void {
    this.isLoading = true;
    this.#bgService.getBoardgame().subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load board games:', error);
        this.isLoading = false;
      }
    });
  }

  onDeleteBoardGame(id: number) {
    this.#bgService.delete(id).subscribe({
      next: () => {
        console.log('Board game deleted successfully');
        this.loadBoardGames();
      },
      error: (error) => {
        console.error('Failed to delete board game:', error);
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
