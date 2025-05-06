import {Component, computed, inject, input, output, Signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BoardGame} from '../../shared/interfaces/boardgame.interface';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {BoardgameService} from '../../shared/services/boardgame.service';

@Component({
  selector: 'app-bg-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bg-form.component.html',
})
export class BgFormComponent {
  readonly #router = inject(Router);
  readonly #bgService = inject(BoardgameService);
  bg = input<BoardGame>(this.#bgService.default_bg);
  addBG = output<BoardGame>({alias: 'sendBG'});
  readonly #formBuilder = inject(FormBuilder);
  message = '';
  textButton = computed(() => this.#bgService.isDefaultBg(this.bg()) ? 'Add new Game' : 'Update Game');

  bgForm: Signal<FormGroup> = computed(() => this.#formBuilder.group({

    Name: [this.bg().name, Validators.required],
    Designer: [this.bg().designer, Validators.required],
    Players: [this.bg().players, Validators.required],
    Playing_time: [this.bg().playingTime, Validators.required],
    Category: [this.bg().categories, Validators.required],
    Complexity: [this.bg().complexity, Validators.required],
    Age: [this.bg().age, Validators.required],
    Cover: [this.bg().cover, Validators.required],
    Description: [this.bg().description],
    Booked: false
    })
  );


  addBg() {
    if(this.bgForm().invalid) {
      this.message = 'Please fill in all required fields.';
  } else {
      const Bg: BoardGame = {
        id: this.bg().id,
        ...this.bgForm().value,
      };
      this.addBG.emit(Bg);
      this.#router.navigate(['/bg/catalog']);
    }
  }

}
