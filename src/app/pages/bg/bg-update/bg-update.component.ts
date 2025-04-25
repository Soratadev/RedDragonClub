import {Component, inject} from '@angular/core';
import {BgFormComponent} from '../../../components/bg-form/bg-form.component';
import {BoardGame} from '../../../shared/interfaces/boardgame.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {bgIdResolver} from '../../../shared/resolvers/bgId.resolver';
import {BoardgameService} from '../../../shared/services/boardgame.service';

@Component({
  selector: 'app-bg-update',
  standalone: true,
  imports: [BgFormComponent],
  template:`
    <div class="flex flex-col p-12">
        <h2 class="rounded bg-blue-400 p-2 w-64 border border-gray-950 text-center font-bold">MODIFY BOARDGAME</h2>
        <app-bg-form [bg]="bg" (sendBG)="updateBG($event)" />
    </div>`,
})
export class BgUpdateComponent {
  readonly #router = inject(Router);
  readonly #activatedRouter = inject(ActivatedRoute);
  readonly #bgService = inject(BoardgameService);

  bg: BoardGame = this.#activatedRouter.snapshot.data['bg'];

  updateBG(bg: BoardGame) {
    console.log('Updating boardgame:', bg);
    this.#bgService.update(bg);
    this.#router.navigate(['/bg/catalog']);
  }
}
