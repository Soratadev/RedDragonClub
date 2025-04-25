import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template:`
  <div class="grid grid-rows-[auto_1fr_auto] min-h-screen w-full">
    <app-header class="col-span-2" />
    <router-outlet />
    <app-footer class="col-span-2" />
  </div>`,
})
export class AppComponent {
  title = 'Red Dragon Club';



}
