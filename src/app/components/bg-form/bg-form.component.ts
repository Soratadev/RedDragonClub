import {Component, computed, inject, input, OnInit, output, Signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BoardGame, Category} from '../../shared/interfaces/boardgame.interface';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {BoardgameService} from '../../shared/services/boardgame.service';
import {CategoryService} from '../../shared/services/category.service';

@Component({
  selector: 'app-bg-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bg-form.component.html',
})
export class BgFormComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #bgService = inject(BoardgameService);
  readonly #formBuilder = inject(FormBuilder);
  readonly #categoryService = inject(CategoryService);

  message = '';
  categories: Category[] = [];
  bg = input<BoardGame>(this.#bgService.default_bg);
  addBG = output<BoardGame>({alias: 'sendBG'});
  textButton = computed(() =>
    this.#bgService.isDefaultBg(this.bg()) ? 'Add new Game' : 'Update Game');

  ngOnInit(): void {
    this.getCategories();
    if (this.bg().categories) {
      this.selectedCategories = [...this.bg().categories];
    }
  }
  private getCategories(): void {
    this.#categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

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

  selectedCategories: Category[] = [];

  onCategorySelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const categoryId = parseInt(select.value);
    const selectedCategory = this.categories.find(cat => cat.id === categoryId);

    if (selectedCategory && !this.selectedCategories.some(cat => cat.id === categoryId)) {
      this.selectedCategories.push(selectedCategory);
      this.bgForm().patchValue({
        Category: this.selectedCategories
      });
    }
    // Reset the select
    select.value = '';
  }

  removeCategory(category: Category): void {
    this.selectedCategories = this.selectedCategories.filter(cat => cat.id !== category.id);
    this.bgForm().patchValue({
      Category: this.selectedCategories
    });
  }

  isOptionVisible(category: Category): boolean {
    return !this.selectedCategories.some(cat => cat.id === category.id);
  }

  addBg() {
    if(this.bgForm().invalid) {
      this.message = 'Please fill in all required fields.';
  } else {
      const formValue = this.bgForm().getRawValue();
      const selectedCategories = Array.isArray(formValue.Category) ?
        formValue.Category : [formValue.Category];

      const Bg: BoardGame = {
        id: this.bg().id,
        name: formValue.Name,
        designer: formValue.Designer,
        players: formValue.Players,
        playingTime: formValue.Playing_time,
        categories: selectedCategories,
        complexity: formValue.Complexity,
        age: formValue.Age,
        cover: formValue.Cover,
        description: formValue.Description,
        Booked: formValue.Booked || false

      };
      this.addBG.emit(Bg);
      this.#router.navigate(['/bg/catalog']);
    }
  }

}
