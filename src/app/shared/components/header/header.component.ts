import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {DropdownComponent} from '../dropdown/dropdown.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

}
