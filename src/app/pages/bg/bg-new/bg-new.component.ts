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
      <h2 class="rounded bg-green-300 p-2 w-72 border border-gray-950 text-center font-bold">
        ADD A NEW BOARD GAME
      </h2>
      <app-bg-form (sendBG)="addBG($event)"/>
      @if(isLoading) {
        <div class="text-center py-4">Creating new board game...</div>
      }
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
export class BgNewComponent {
  readonly #boardgameService = inject(BoardgameService);
  readonly #router = inject(Router);
  isLoading: boolean = false;
  error: string = '';
  success: string = '';

  addBG(bg: BoardGame) {
    this.isLoading = true;
    this.error = '';
    this.success = '';

    this.#boardgameService.add(bg).subscribe({
      next: (createdBg) => {
        this.success = 'Board game added successfully!';
        console.log('Added board game:', createdBg);

        // Esperar un momento para mostrar el mensaje de éxito
        setTimeout(() => {
          this.#router.navigate(['/bg/catalog']);
        }, 1500);
      },
      error: (err) => {
        this.error = 'Error creating board game: ' +
          (err.error?.message || err.message || 'Unknown error');
        console.error('Error creating board game:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
