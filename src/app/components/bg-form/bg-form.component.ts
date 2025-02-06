import {Component, inject, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BoardGame} from '../../shared/interfaces/boardgame.interface';

@Component({
  selector: 'app-bg-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bg-form.component.html',
  styleUrl: './bg-form.component.scss'
})
export class BgFormComponent {
  addBG = output<BoardGame>();
  readonly #formBuilder = inject(FormBuilder);
  message = '';
  bgForm: FormGroup = this.#formBuilder.group({
    id: this.getNextId(),
    Name: ['', Validators.required],
    Designer: ['', Validators.required],
    Players: ['', Validators.required],
    Playing_time: ['', Validators.required],
    Category: [[] as string[], Validators.required],
    Complexity: [0, Validators.required],
    Age: ['', Validators.required],
    Cover: ['', Validators.required],
    Description: ['', Validators.required],
    Booked: false
  });

  addBg() {
    if(this.bgForm.invalid) {
      this.message = 'Please fill in all required fields.';
  } else {
      const Bg: BoardGame = {
        ...this.bgForm.value,
      };
      this.addBG.emit(Bg);
    }
  }
  private counter: number = 27;
  getNextId() {
    return this.counter++;
  }
}
