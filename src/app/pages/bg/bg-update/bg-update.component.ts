import {Component, inject, OnInit} from '@angular/core';
import {BgFormComponent} from '../../../components/bg-form/bg-form.component';
import {BoardGame} from '../../../shared/interfaces/boardgame.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardgameService} from '../../../shared/services/boardgame.service';

@Component({
  selector: 'app-bg-update',
  standalone: true,
  imports: [BgFormComponent],
  template:`
    <div class="flex flex-col p-12">
        <h2 class="rounded bg-blue-300 p-2 w-72 border border-gray-950 text-center font-bold">MODIFY BOARD GAME</h2>
        <app-bg-form [bg]="bg" (sendBG)="updateBG($event)" />
    </div>`,
})
export class BgUpdateComponent implements OnInit{
  readonly #router = inject(Router);
  readonly #activatedRouter = inject(ActivatedRoute);
  readonly #bgService = inject(BoardgameService);

  boardGames: BoardGame[] = [];
  bg: BoardGame = this.#activatedRouter.snapshot.data['bg'];

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
    console.log('Updating boardgame:', bg);
    this.#bgService.update(bg);
    this.#router.navigate(['/bg/catalog']);
  }
}
