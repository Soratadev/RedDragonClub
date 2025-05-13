import {Component, inject} from '@angular/core';
import {BgFormComponent} from '../../../components/bg-form/bg-form.component';
import {BoardGame} from '../../../shared/interfaces/boardgame.interface';
import {BoardgameService} from '../../../shared/services/boardgame.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bg-new',
  standalone: true,
  imports: [BgFormComponent],
  templateUrl: 'bg-new.component.html',
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
          this.#router.navigate(['/public/catalog']);
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
