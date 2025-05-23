import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template:`
  <div class="grid grid-rows-[auto_1fr_auto] min-h-screen">
    <app-header/>
    <main class="w-full">
      <router-outlet/>
    </main>
    <app-footer/>
  </div>`,
})
export class AppComponent {
  title = 'Red Dragon Club';



}
