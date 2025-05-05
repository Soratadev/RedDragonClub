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

    Name: [this.bg().Name, Validators.required],
    Designer: [this.bg().Designer, Validators.required],
    Players: [this.bg().Players, Validators.required],
    Playing_time: [this.bg().Playing_time, Validators.required],
    Category: [this.bg().Category, Validators.required],
    Complexity: [this.bg().Complexity, Validators.required],
    Age: [this.bg().Age, Validators.required],
    Cover: [this.bg().Cover, Validators.required],
    Description: [this.bg().Description, ],
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
