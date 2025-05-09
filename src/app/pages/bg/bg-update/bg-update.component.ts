import {Component, inject, OnInit} from '@angular/core';
import {BgFormComponent} from '../../../components/bg-form/bg-form.component';
import {BoardGame} from '../../../shared/interfaces/boardgame.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardgameService} from '../../../shared/services/boardgame.service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-bg-update',
  standalone: true,
  imports: [BgFormComponent],
  templateUrl: 'bg-update.component.html',
})
export class BgUpdateComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #activatedRouter = inject(ActivatedRoute);
  readonly #bgService = inject(BoardgameService);

  boardGames: BoardGame[] = [];
  bg: BoardGame = this.#activatedRouter.snapshot.data['bg'];
  error: string = '';
  success: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.callApiService();
    console.log('Updating boardgame:', this.bg);
  }

  private callApiService() {
    this.#bgService.getBoardgame().subscribe((data) => {
      this.boardGames = data;
    });
  }

  updateBG(bg: BoardGame) {
    this.isLoading = true;
    this.error = '';
    this.success = '';

    this.#bgService.update(bg).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (updatedBg) => {
        this.success = 'Board game updated successfully!';
        console.log('Updated board game:', updatedBg);

        // Refrescar la lista de juegos
        this.#bgService.refreshBoardGames().subscribe({
          next: () => {
            setTimeout(() => {
              this.#router.navigate(['/bg/catalog']);
            }, 1500); // Espera 1.5 segundos antes de navegar
          }
        });
      },
      error: (err) => {
        this.error = 'Error updating board game: ' +
          (err.error?.message || err.message || 'Unknown error');
      }
    });
  }
}



  /*this.#bgService.update(bg).subscribe({
    next: () => {
      console.log('Board game updated successfully');
      this.#router.navigate(['/bg/catalog']);
    },
    error: (err) => {
      this.error = 'Error updating board game: ' + err.message;
    }
  });

}
}*/
