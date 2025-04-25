import {Component, computed, inject, input, numberAttribute} from '@angular/core';
import {BgItemComponent} from '../../../components/bg-item/bg-item.component';
import {BoardgameService} from '../../../shared/services/boardgame.service';
import {BoardGame} from '../../../shared/interfaces/boardgame.interface';

@Component({
  selector: 'app-bg-details',
  standalone: true,
  imports: [BgItemComponent],
  template: `
    <app-bg-item [boardgame]="bg()" />`,
})
export class BgDetailsComponent {
  id = input(0, { transform: numberAttribute });
  readonly #bgService = inject(BoardgameService);
  bg = computed<BoardGame>(() => this.#bgService.findById(this.id()));

}
