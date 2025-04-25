import {Component, inject} from '@angular/core';
import {BgListComponent} from '../../../components/bg-list/bg-list.component';
import {BoardgameService} from '../../../shared/services/boardgame.service';

@Component({
  selector: 'app-bg-catalog',
  standalone: true,
  imports: [BgListComponent],
  template: `<app-bg-list [boardgames]="boardgames" />`,
})
export class BgCatalogComponent {
  readonly #bgService = inject(BoardgameService);
  boardgames = this.#bgService.findAll();

}
