import {Component, inject, OnInit} from '@angular/core';
import {BoardgameService} from '../../../shared/services/boardgame.service';
import {BoardGame} from '../../../shared/interfaces/boardgame.interface';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-manage-bg',
  templateUrl: './manage-bg.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class ManageBgComponent implements OnInit {
  readonly #bgService = inject(BoardgameService);
  boardgames: BoardGame[] = [];

  ngOnInit(): void {
    this.loadBoardGames();
  }

  private loadBoardGames(): void {
    this.#bgService.getBoardgame().subscribe({
      next: (games: BoardGame[]) => {
        this.boardgames = games;
      },
      error: (error: any) => {
        console.error('Failed to load board games:', error);
        this.boardgames = [];
      },
    });
  }

  deleteBoardGame(bgId: number): void {
    if (confirm('Are you sure you want to delete this board game?')) {
      this.#bgService.delete(bgId).subscribe({
        next: () => {
          console.log('Board game deleted successfully');
          this.loadBoardGames();
        },
        error: (error: any) => {
          console.error('Failed to delete board game:', error);
        },
      });
    }
  }
}
