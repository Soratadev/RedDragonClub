import {Component, inject} from '@angular/core';
import {BgFormComponent} from '../../../components/bg-form/bg-form.component';
import {BoardGame} from '../../../shared/interfaces/boardgame.interface';
import {BoardgameService} from '../../../shared/services/boardgame.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bg-new',
  standalone: true,
  imports: [BgFormComponent],
  template: `
    <div class="p-12">
        <h2 class="rounded bg-green-300 p-2 w-72 border border-gray-950 text-center font-bold">ADD A NEW BOARD GAME</h2>
        <app-bg-form (sendBG)="addBG($event)"/>
    </div>`,
})
export class BgNewComponent {
  readonly #boardgameService = inject(BoardgameService);
  readonly #router = inject(Router);

  addBG(bg: BoardGame) {
    this.#boardgameService.add(bg);
    this.#router.navigate(['/bg/catalog'])
  }

}
