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
  template:`
    <div class="flex flex-col p-8">
        <h2 class="rounded bg-blue-300 p-2 w-72 border border-gray-950 text-center font-bold">MODIFY BOARD GAME</h2>
      @if(isLoading) {
        <div class="text-center py-4">Updating...</div>
      }
      <app-bg-form [bg]="bg" (sendBG)="updateBG($event)" />
      @if(error) {
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {{error}}
        </div>
      }
      @if(success) {
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
          {{success}}
        </div>
      }
    </div>`,
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
